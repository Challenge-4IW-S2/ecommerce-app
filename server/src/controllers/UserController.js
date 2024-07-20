import UserRepository from "../postgresql/repository/UserRepository.js";
import UserRoleRepository from "../postgresql/repository/UserRoleRepository.js";
import bcrypt from "bcryptjs";
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

    static async getAllUserRole(request, response) {
        const userRoleRepository = new UserRoleRepository();
        const roles = await userRoleRepository.findAll();
        console.log(roles)
        response.json(roles);
    }

    // Méthodes appelées par les routes client (pour modifier son propre compte)
    static async changeClientPassword(request, response) {
        const parameters = request.body;

        // do the change password
        const userRepository = new UserRepository();
        const user = await userRepository.findOne('id', request.user.id)

        // check if old password is correct
        const isPasswordValid = await bcrypt.compare(parameters.oldPassword, user.password);
        if (!isPasswordValid) {
            return response.status(401).send();
        }

        // check if new password and confirm password are the same
        if (parameters.newPassword !== parameters.confirmNewPassword) {
            return response.status(400).send();
        }

        // update the password (no need to hash it, it will be hashed in the model)
        userRepository.updateUser(user.id, {password: parameters.newPassword})
            .then(() => {
                response.status(200).send();
            })
            .catch(err => {
                response.status(500).send();
            });
    }

    static updateClientProfile(request, response) {
        const parameters = request.body;
        const userRepository = new UserRepository();
        userRepository.findOne('id', request.user.id)
            .then(user => {
                userRepository.updateUser(user.id, parameters)
                    .then(() => {
                        response.status(200).send();
                    })
                    .catch(err => {
                        response.status(500).send();
                    });
            })
            .catch(err => {
                response.status(500).send();
            });
    }

    static deleteClientAccount(request, response) {
        return response.json({
            message: 'Logged'
        }).send()
    }
}

