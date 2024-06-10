import UserRepository from "../postgresql/Repository/UserRepository.js";

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
                ee: process.env
            });
        })
    }
}
