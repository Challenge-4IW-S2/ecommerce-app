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
            password: request.body.password,
        };

        const info = {
            time: new Date().toLocaleString(),
            url: 'https://luzaya.fr',
        };

        try {
            const userRepository = new UserRepository();
            const today = new Date();
            const user = await userRepository.findOne('email', parameters.email);

            if (!user) return response.status(401).send("Email or password incorrect");

            if (user.lock_until && new Date(user.lock_until) > today) {
                return response.status(429).send('Account is locked. Please try again later.');
            }

            if (!user.is_verified) return response.status(401).send();
            if (user.deleted) return response.status(401).send();
            const lastPasswordChange = new Date(user.password_updated_at);
            const differenceInDays = Math.floor((today - lastPasswordChange) / (1000 * 60 * 60 * 24));
            if (differenceInDays >= 60) return response.status(403).send();

            if (!(await bcrypt.compare(parameters.password, user.password))) {
                console.log('wrong password');
                let attempts = user.attempt_connexion || 0;
                attempts++;
                console.log(attempts);

                if (attempts >= 3) {
                    console.log('lock');
                    user.lock_until = new Date(today.getTime() + 3600000);
                    user.attempt_connexion = attempts;
                    const [result] = await userRepository.updateUser(user.id, {lock_until: user.lock_until});
                    if (result === 0) {
                        console.log('Aucune ligne affectée. Vérifiez que l\'ID existe et que les données de mise à jour sont différentes des données existantes.');
                    } else {
                        console.log('Utilisateur mis à jour.');
                    }

                    console.log('send mail');
                    await sendEmail(parameters.email,
                        'Luzaya.fr; Action requise : Tentative de connexion',
                        attackAttemptTemplate(info));

                    return response.status(429).send('Account is locked due to too many failed attempts. Please check your email.');
                } else {
                    await userRepository.updateUser(user.id, { attempt_connexion: attempts });
                    return response.status(401).send("Email or password incorrect");
                }
            }

            await userRepository.updateUser(user.id, { attempt_connexion: 0, lock_until: null });

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

    static async deleteAccount(request, response) {
        const parametersSchema = z.object({
            password: z.string(),
            deleteAccountPhrase: z.literal('Je souhaite supprimer mon compte')
        });

        const parsedParameters = parametersSchema.safeParse(request.body);
        if (!parsedParameters.success) {
            return response.status(400).send();
        }

        const userRepository = new UserRepository();
        const user = await userRepository.findOne('id', request.user.id);
        if (!user || !bcrypt.compare(parsedParameters.data.password, user.password)) {
            return response.status(401).send();
        }

        userRepository.deleteUser(user.id).then(r => {
            // logout user
            response.clearCookie('JWT', {
                httpOnly: true,
                signed: true
            });

            return response.status(200).send();
        });
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
