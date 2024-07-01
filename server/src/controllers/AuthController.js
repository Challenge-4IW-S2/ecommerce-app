import UserRepository from "../postgresql/Repository/UserRepository.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import {z} from 'zod';
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
        const userRepository = new UserRepository();
        const user = await userRepository.findOne('email', parameters.email);
        if (!user) return response.status(401).send("User not found");
        if (!(await bcrypt.compare(request.body.password, user.password))) {
            return response.status(401).send( "Email or password incorrect");
        }

        const token = jwt.sign(
            {
                id: user.id,
                role: user.role,
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "30 days",
                algorithm: "HS256",
            }
        );
        response("JWT", token, {
            httpOnly: true,
            signed: true,
        });
    }
}
