import jwt from "jsonwebtoken";
import {JSONCookie} from "cookie-parser";


/* const authenticateToken = (req, res, next) => {
    const token = req.signedCookies.JWT;
    if (!token) {
        return res.status(401).json({ message: "Access denied. No token provided." });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({ message: "Invalid token." });
        }
        req.user = user;
        next();
    });
}*/

const loginAttempts = {}
    const rateLimiter = (req, res, next) => {
        const { email } = req.body.email;
        if (!loginAttempts[email]) {
            console.log("ici")
            loginAttempts[email] = { attempts: 0, lastAttempt: Date.now() };
        }

        const userAttempts = loginAttempts[email];
        if (userAttempts.attempts >= 3) {
            const timeSinceLastAttempt = Date.now() - userAttempts.lastAttempt;
            if (timeSinceLastAttempt < 300000) { // Temporisation de 5 minutes
                return res.status(429).send('Trop de tentatives, veuillez réessayer plus tard.');
            } else {
                userAttempts.attempts = 0;
            }
        }
        userAttempts.lastAttempt = Date.now();
        next();
    }
module.exports = {
    rateLimiter,
    loginAttempts,
};

