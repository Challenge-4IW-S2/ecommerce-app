import UserRepository from "../postgresql/repository/UserRepository.js";
import UserRoleRepository from "../postgresql/repository/UserRoleRepository.js";
// import User from "../postgresql/models/User.js";
import AdressRepository from "../postgresql/repository/AdressRepository.js";


export class UserController {
    static async getAllUsers(request, response) {
        const userRepository = new UserRepository();
        const users = await userRepository.findAll();
        response.json(users);
    }
    static async getUser(request, response) {
        const userRepository = new UserRepository();
        const user = await userRepository.findByPk(request.params.id);
        if (!user) return response.status(404).send("User not found");
        response.json(user);
    }
    static async createUser(request, response,next) {
        const parameters = {
            email: request.body.email,
            password: request.body.password,
            firstname: request.body.firstname,
            lastname: request.body.lastname,
            phone: request.body.phone,
            role: request.body.role
        }
        try {
            const userRepository = new UserRepository();
            const user = await userRepository.createUser(parameters);
            response.status(201).json(user);
        }catch (e){
            next(e)
        }
    }


    static async updateUser(request, response,next) {
        const parameters = {
            email: request.body.email,
            password: request.body.password,
            firstname: request.body.firstname,
            lastname: request.body.lastname,
            phone: request.body.phone,
            role: request.body.role
        }
        try {
            const userRepository = new UserRepository();
            parameters.role = await new UserRoleRepository().getRoleId(parameters.role);
            const [nbUpdated,user] = await userRepository.updateUser(request.params.id, parameters);
            if (nbUpdated === 1) return response.status(200).json(user[0]);
            response.sendStatus(404);
        } catch (e) {
                next(e)
        }
    }
    static async deleteUser(request, response,next) {
        const userRepository = new UserRepository();
        const userAddressRepository = new AdressRepository();
        // verifier si admin ou si himself
        try {
            const [nbDeleted] = await userRepository.deleteUser(request.params.id);
            if (nbDeleted === 1) {
                const addresses = await userAddressRepository.findByOtherField("user_id", request.params.id);

                if (addresses.length === 0) {
                    return response.sendStatus(204);
                }
                const deleteAddress = await userAddressRepository.deleteAdressFromUser(request.params.id);

                response.sendStatus(deleteAddress === 1 ? 204 : 404);
            } else {
                 response.sendStatus(404);
            }
        }catch (e){
            next(e)
        }

    }



}

