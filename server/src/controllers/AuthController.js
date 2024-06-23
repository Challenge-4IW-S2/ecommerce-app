import UserRepository from "../postgresql/Repository/UserRepository.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import {z} from 'zod';
export class AuthController {
    static signup(request, response) {

        const parametersSchema = z.object({
            email: z.string().email(),
            password: z.string(),
            firstname: z.string(),
            lastname: z.string(),
            phone: z.string(),
            role: z.string(),
        });

        const parsedParameters = parametersSchema.safeParse(request.body);
        if (!parsedParameters.success) {
            response.status(400).json({
                message: 'Bad request',
                errors: parsedParameters.error.issues
            });
            return;
        }

        const userRepository = new UserRepository();
        userRepository.createUser(parsedParameters.data).then(res => {
            response.status(201).json({
                success: true,
                message: 'User successfully created',
            });
        }).catch(error => {
            response.json({
                success: false,
                message: 'User not created, an error occurred',
                e: error.message,
                traceroute: error.stack.split('\n').map(line => line.trim()),
                b: parsedParameters
            });
        })
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
