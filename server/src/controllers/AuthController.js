import UserRepository from "../postgresql/repository/UserRepository.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import {sendEmail} from "./SendMailController.js";
import {z} from 'zod';
import {attackAttemptTemplate} from "../mailsTemplates/attackAttemptMail.js";
import ResetPasswordTokenRepository from "../postgresql/repository/ResetPasswordTokenRepository.js";
import { v4 as uuidv4 } from 'uuid';
const loginAttempts = {}
import UserRoleRepository from "../postgresql/repository/UserRoleRepository.js";
import {confirmUser} from "../mailsTemplates/confirmUser.js";

export class AuthController {
    static async verifyToken(request, response, next) {
        try {
            const token = request.params.token
            const userRepository = new UserRepository();
            const user = await userRepository.findOne('token', token);

            if (!user) {
                return response.status(404).send();
            }
            const [nbUpdated,verifiedUser] = await userRepository.updateUser(user.id, {
                is_verified: true,
                token: null
            });
            if (nbUpdated === 1) return response.status(200).json(verifiedUser[0]);
        } catch (e) {
            return response.status(400).json(e);
        }
    };

    static signup(request, response) {
        const parametersSchema = z.object({
            firstname: z.string(),
            lastname: z.string(),
            email: z.string().email(),
            confirmEmail: z.string().email(),
            password: z.string(),
            confirmPassword: z.string(),
        });

        const parsedParameters = parametersSchema.safeParse(request.body);
        if (!parsedParameters.success) {
            response.status(400);
            return;
        }

        if (parsedParameters.data.email !== parsedParameters.data.confirmEmail) {
            response.status(400);
            return;
        }

        if (parsedParameters.data.password !== parsedParameters.data.confirmPassword) {
            response.status(400);
            return;
        }

        const userData = {
            firstname: request.body.firstname,
            lastname: request.body.lastname,
            email: request.body.email,
            password: request.body.password,
            role: 'ROLE_USER',
            phone: null,
            token: uuidv4()
        };


        const userRepository = new UserRepository();
        userRepository.createUser(userData)
            .then(async () => {
                await sendEmail(userData.email, 'Luzaya.fr; Action requise : Vérification de votre adresse email', confirmUser(userData))
                response.sendStatus(201)
            })
            .catch(err => {
              const isNotUnique = err.name === 'SequelizeUniqueConstraintError';
               // const message = isNotUnique ? 'Un compte existe déjà avec cet email' : 'Une erreur est survenue';
                const code = isNotUnique ? 409 : 500;
                response.sendStatus(code);
            });
    }

    static async login(request, response) {

        const parameters = {
            email: request.body.email,
            password:  request.body.password,
        }

        const info = {
            time: new Date().toLocaleString(),
            url: 'https://luzaya.fr',
        };

        const now = Date.now()
        try{
             if (!loginAttempts[parameters.email]) {
                loginAttempts[parameters.email] = { attempts: 0, lastAttempt: Date.now() };
            }
            const userAttempts = loginAttempts[parameters.email];
            if (userAttempts.attempts >= 3) {
                const timeSinceLastAttempt = Date.now() - userAttempts.lastAttempt;
                if (timeSinceLastAttempt < 3000) {
                    return response.status(429).send('Trop de tentatives, veuillez réessayer plus tard.');
                } else {
                    userAttempts.attempts = 0;
                }
            }
            const userRepository = new UserRepository();
            const today = new Date();

            const user = await userRepository.findOne('email', parameters.email);
            const lastPasswordChange = new Date(user.password_updated_at);
            const differenceInDays = Math.floor((today - lastPasswordChange) / (1000 * 60 * 60 * 24));
            if (!user) return response.status(401).send("Email or password incorrect");
            if (!user.is_verified) return response.status(401).send();
            if (differenceInDays >= 60) return response.status(403).send();
            if (user.deleted) return response.status(401).send();


            if (!user ||!(await bcrypt.compare(parameters.password, user.password)) ){
                loginAttempts[parameters.email].attempts += 1;
                if (loginAttempts[parameters.email].attempts >= 3) {
                    await sendEmail(parameters.email,
                        'Luzaya.fr; Action requise : Tentative de connexion',
                        attackAttemptTemplate(info))
                }
                return response.sendStatus(401);
            }
            loginAttempts[parameters.email].attempts = 0;

            // Vérification de la date de dernier changement de mot de passe

            /*const passwordChangeDate = new Date(user.password_updated_at);
            const passwordExpiryDate = new Date(passwordChangeDate.getTime() + 60 * 24 * 60 * 60 * 1000); // 60 jours après le dernier changement
            if (now > passwordExpiryDate) {
                console.log(passwordExpiryDate)
            }*/

           const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
                expiresIn: "30 days",
                algorithm: "HS256"
            });

            response.cookie('JWT', token, {
                httpOnly: true,
                signed: true,
                secure: true,
                sameSite: 'none'
            });
            response.sendStatus(200);

        } catch (error) {
            response.status(500).send(error.toString());
        }
    }

    static logout(request, response) {
        response.clearCookie('JWT', {
            httpOnly: true,
            signed: true
        });
        response.json({
            message: "Logged out successfully"
        });
    }

    static async forgotPassword(request, response) {
        const parametersSchema = z.object({
            email: z.string().email(),
        });

        const parsedParameters = parametersSchema.safeParse(request.body);
        if (!parsedParameters.success) {
            return response.status(400).send();
        }

        const userRepository = new UserRepository();
        const user = await userRepository.findOne('email', parsedParameters.data.email);
        if (!user) {
            return response.status(404).send();
        }

        const resetPasswordTokenRepository = new ResetPasswordTokenRepository();

        //check if 5mn has passed since last reset password token
        const lastResetPasswordToken = await resetPasswordTokenRepository.findByOtherField({
            'user_id': user.id
        }, ['created_at', 'DESC']);

        if (lastResetPasswordToken) {
            const now = new Date();
            const diff = now - lastResetPasswordToken.createdAt;
            // 5 * 60 -> 5mn (*1000 en ms)
            if (diff < 5 * 60 * 1000) {
                return response.status(429).send();
            }
        }

        const resetPasswordToken = await resetPasswordTokenRepository.createResetPasswordToken(user)

        // TODO: envoyer mail avec reset password (response temporaire ici donc)
        response.json(resetPasswordToken);
    }

    static checkResetPasswordToken(request, response) {
        const token = request.params.token;
        const resetPasswordTokenRepository = new ResetPasswordTokenRepository();

        const resetPasswordToken = resetPasswordTokenRepository.findByOtherField({
            token: token
        })

        if (!resetPasswordToken) {
            return response.status(404).send();
        }

        if (resetPasswordToken.used || resetPasswordToken.expires_at > new Date()) {
            return response.status(403).send();
        }

        response.status(200).send();
    }


    static async authCheck(request, response) {
        const userRoleRepository = new UserRoleRepository();
        const role = (await userRoleRepository.findOne('id', request.user.role)).name;

        const user = {
            email: request.user.email,
            role: role,
            firstname: request.user.firstname,
            lastname: request.user.lastname,
            phone: request.user.phone
        };


        return response.status(200).json(user);
    }
}
