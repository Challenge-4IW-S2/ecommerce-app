import UserRepository from "../postgresql/repository/UserRepository.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

let loginAttempts = {};
const MAX_ATTEMPTS = 3;
const LOCK_TIME = 15 * 60 * 1000;

import {z} from 'zod';
import e from "express";
import ResetPasswordTokenRepository from "../postgresql/Repository/ResetPasswordTokenRepository.js";

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

        const userRepository = new UserRepository();
        userRepository.createUser(userData)
            .then(() => {
                response.status(201).json({
                    message: 'Compte créé'
                })
            })
            .catch(err => {
                // TODO: Erreur isNotUnique ?
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
        const now = Date.now();

        if (loginAttempts[parameters.email] && loginAttempts[parameters.email].lockUntil > now) {
            return response.status(403).send('Votre compte a été temporairement verrouillé en raison de trop nombreuses tentatives de connexion infructueuses. Veuillez réessayer plus tard.');
        }
        try {
            const userRepository = new UserRepository();
            const user = await userRepository.findOne('email', parameters.email);
            if (!user) return response.status(401).send("Email or password incorrect");

            if (!(await bcrypt.compare(parameters.password, user.password))) {
                return response.status(401).send( "Email or password incorrect");
            }

            if (!user || !(await bcrypt.compare(parameters.password, user.password))) {
                if (!loginAttempts[parameters.email]) {
                    loginAttempts[parameters.email] = { count: 1, lockUntil: 0 };
                } else {
                    loginAttempts[parameters.email].count++;
                }

                if (loginAttempts[parameters.email].count >= MAX_ATTEMPTS) {
                    loginAttempts[parameters.email].lockUntil = now + LOCK_TIME;
                    sendLockNotification(parameters.email); // Implémentez cette fonction pour envoyer un email de notification
                }

                return response.status(401).send('Email ou mot de passe incorrect');
            }

            loginAttempts[parameters.email] = { count: 0, lockUntil: 0 };

            // Vérification de la date de dernier changement de mot de passe
            const passwordChangeDate = new Date(user.passwordLastChanged);
            const passwordExpiryDate = new Date(passwordChangeDate.getTime() + 60 * 24 * 60 * 60 * 1000); // 60 jours après le dernier changement
            if (now > passwordExpiryDate) {
                return response.status(403).send('Votre mot de passe a expiré. Veuillez le réinitialiser.');
            }

           // response.json({ status: 200, user: { id: user.id, name: user.name, email: user.email }, message: "Login successful" });

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

    // TODO: Check auth
    static deleteAccount(request, response) {
        return response.json({
            c: 'bon'
        }).send()
    }


}
