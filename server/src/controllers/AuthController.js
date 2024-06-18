import UserRepository from "../postgresql/Repository/UserRepository.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

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
        userRepository.createUser(parameters).then(res => {
            response.json({
                success: true,
                message: 'User successfully created',
            });
        }).catch(error => {
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
