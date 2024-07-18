import UserRepository from "../postgresql/repository/UserRepository.js";
import UserRoleRepository from "../postgresql/repository/UserRoleRepository.js";
import User from "../postgresql/models/User.js";
import {z} from "zod";
import bcrypt from "bcryptjs";

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

    static async createUser(request, response) {
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

    static async updatePutUser(request, response) {
        const parameters = {
            email: request.body.email,
            password: request.body.password,
            firstname: request.body.firstname,
            lastname: request.body.lastname,
            phone: request.body.phone,
            role: request.body.role
        }
        const userRepository = new UserRepository();
        try {
            const id = request.params.id;
            const nbDeleted = await userRepository.destroy(id);
            const user = await userRepository.createUser({id, ...parameters});
            response.status(nbDeleted === 1 ? 200 : 201).json(user);
        } catch (e) {
            response.json({
                success: false,
                message: 'User not updated, an error occurred',
                e: e.message,
            });
        }
    }

    static async updateUser(request, response) {
        const parameters = {
            email: request.body.email,
            password: request.body.password,
            firstname: request.body.firstname,
            lastname: request.body.lastname,
            phone: request.body.phone,
            role: request.body.role
        }
        const userRepository = new UserRepository();
        userRepository.updateUser(request.params.id, parameters).then(res => {
            response.json({
                success: true,
                message: 'User successfully updated',
            });
        }).catch(error => {
            response.json({
                success: false,
                message: 'User not updated, an error occurred',
                e: error.message,
            });
        })
    }

    static async deleteUser(request, response) {
        const userRepository = new UserRepository();
        // verifier si admin ou si himself
        userRepository.deleteUser(request.params.id).then(res => {
            response.json({
                success: true,
                status: 204,
                message: 'User successfully deleted',
            });
        }).catch(error => {
            response.json({
                success: false,
                message: 'User not deleted, an error occurred',
                e: error.message,
            });
        })
    }

    static async getUserRole(request, response) {
        const userRoleRepository = new UserRoleRepository();
        const role = await userRoleRepository.findByPk(request.body.role);
        if (!role) return response.status(404).send("User role not found");
        response.json(role);
    }

    static async updateUserRole(request, response) {
        const parameters = {
            role: request.body.role
        }
        const userRoleRepository = new UserRoleRepository();
        userRoleRepository.updateUserRole(request.params.id, parameters).then(res => {
            response.json({
                success: true,
                message: 'User role successfully updated',
            });
        }).catch(error => {
            response.json({
                success: false,
                message: 'User role not updated, an error occurred',
                e: error.message,
            });
        })
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
        const userRepository = new UserRepository();
        userRepository.findOne('id', request.user.id)
            .then(user => {
                userRepository.updateUser(user.id, {
                    firstname: parsedParameters.data.firstname,
                    lastname: parsedParameters.data.lastname,
                    email: parsedParameters.data.email,
                    phone: parsedParameters.data.phone
                })
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

