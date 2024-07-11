import UserRepository from "../postgresql/Repository/UserRepository.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import {sendEmail} from "../middlewares/sendEmail.js";
import {z} from 'zod';
const loginAttempts = {}

export class AuthController {

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
            phone: null
        };
       // await sendEmail('progrdnvictor@gmail.com','attack detected','Plusieurs tentative de connexion ont été détectées sur votre compte' )

        const userRepository = new UserRepository();
        userRepository.createUser(userData)
            .then(() => {
                response.status(201).json(sendEmail('progrdnvictor@gmail.com','attack detected','Plusieurs tentative de connexion ont été détectées sur votre compte,<br> <button> BACK </button>'),{
                    message: 'Compte créé'
                })

            })
            .catch(err => {

                const isNotUnique = err.errors[0].validatorKey === 'not_unique';

                const message = isNotUnique
                    ? 'Un compte existe déjà avec cet email'
                    : 'Une erreur est survenue';

                const code = isNotUnique
                    ? 409
                    : 500;

                response.status(code).json({
                    message: message
                });
            });
    }
    static async login(request, response) {

        const parameters = {
            email: request.body.email,
            password:  request.body.password,
        }
        const now = Date.now()
        try{
            if (!loginAttempts[parameters.email]) {
                loginAttempts[parameters.email] = { attempts: 0, lastAttempt: Date.now() };
            }
            const userAttempts = loginAttempts[parameters.email];
            if (userAttempts.attempts >= 3) {
                const timeSinceLastAttempt = Date.now() - userAttempts.lastAttempt;
                if (timeSinceLastAttempt < 300000) { // Temporisation de 5 minutes
                    return response.status(429).send('Trop de tentatives, veuillez réessayer plus tard.');
                } else {
                    userAttempts.attempts = 0;
                }
            }
            const userRepository = new UserRepository();
            const user = await userRepository.findOne('email', parameters.email);
            if (!user ||!(await bcrypt.compare(parameters.password, user.password)) ){
                loginAttempts[parameters.email].attempts += 1;
                if (loginAttempts[parameters.email].attempts >= 3) {
                    await sendEmail('progrdnvictor@gmail.com', 'Luzaya.fr; Action requise : Tentative de connexion\n',  'Quelqu’un qui connaît votre mot de passe est en train d’essayer de se connecter à votre compte. <br> <a href="">Souhaitez vous changer votre mot de passe ? </a>')
                }
                //'Luzaya.fr; Action requise : Tentative de connexion\n', 'Quelqu’un qui connaît votre mot de passe est en train d’essayer de se connecter à votre compte. <br> <a href="">Souhaitez vous changer votre mot de passe ? </a>'
                return response.status(401).send("Email or password incorrect");
            }
            loginAttempts[parameters.email].attempts = 0;

            // Vérification de la date de dernier changement de mot de passe
                // const passwordChangeDate = new Date(user.passwordLastChanged);
                // const passwordExpiryDate = new Date(passwordChangeDate.getTime() + 60 * 24 * 60 * 60 * 1000); // 60 jours après le dernier changement
                /* if (now > passwordExpiryDate) {
                     return response.status(403).send('Votre mot de passe a expiré. Veuillez le réinitialiser.');
                 }*/

                // response.json({ status: 200, user: { id: user.id, name: user.name, email: user.email }, message: "Login successful" });

                const token = jwt.sign({userId: user.id}, process.env.JWT_SECRET, {
                    expiresIn: "30 days",
                    algorithm: "HS256"
                });
                response.cookie('JWT', token, {httpOnly: true, signed: true, secure: true, sameSite: 'none'});
                response.status(200).send(user);
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


}
