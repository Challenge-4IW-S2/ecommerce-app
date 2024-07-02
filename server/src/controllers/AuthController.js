import UserRepository from "../postgresponseql/Repository/UserRepository.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import {JSONCookie} from "cookie-parser";
let loginAttempts = {};
const MAX_ATTEMPTS = 3;
const LOCK_TIME = 15 * 60 * 1000;

export class AuthController {
    static signup(request, response) {
        const parameters = {
            email: request.body.email,
            password: request.body.password,
            firstname: request.body.firstname,
            lastname: request.body.lastname,
            phone: request.body.phone,
            role: request.body.role
        }

        const userRepository = new UserRepository();
        userRepository.createUser(parameters).then(response => {
            response.json({
                success: true,
                message: 'User successfully created',
            });
        }).catch(error => {
            console.log(parameters)
            response.json({
                success: false,
                message: 'User not created, an error occurred',
                e: error.message,
            });
        })
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
        try{
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

            const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {expiresponseIn: "30 days", algorithm: "HS256"});
            response.cookie('JWT', token, {httpOnly: true, signed: true, secure: true, sameSite: 'none'});
            response.status(200).send(user);

        } catch (error) {
            response.status(500).send('Erreur de serveur');
        }
    }

}
