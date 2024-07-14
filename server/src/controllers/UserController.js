import UserRepository from "../postgresql/Repository/UserRepository.js";
import UserRoleRepository from "../postgresql/Repository/UserRoleRepository.js";
import AdressRepository from "../postgresql/Repository/AdressRepository.js";

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
                status: 200,
                message: 'User successfully created',
            });
        }).catch(error => {
            response.json({
                status: false,
                message: 'User not created, an error occurred',
                e: error.message,
            });
        })
    }
    static async updatePutUser(request, response)
    {
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
           const user = await userRepository.createUser({ id, ...parameters});
           response.status(nbDeleted === 1 ? 200 : 201).json(user);
        } catch (e) {
            response.json({
                status: 201,
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
               status: 200,
               message: 'User successfully updated',
           });
       }).catch(error => {
           response.json({
               status: false,
               message: 'User not updated, an error occurred',
               e: error.message,
           });
       })
    }
    static async deleteUser(request, response) {
        const userRepository = new UserRepository();
        const userAddressRepository = new AdressRepository();
        //DELETE ADDRESS
        // verifier si admin ou si himself
        try {
            const nbDeleted = await userRepository.deleteUser(request.params.id);
            if (nbDeleted === 1) {
                const deleteAdress = await userAddressRepository.deleteAdressFromUser(request.params.id);
                console.log("deleteAdress")
                console.log(deleteAdress)
                return response.status(deleteAdress === 1 ? 204 : 404);
            } else {
                response.sendStatus(404);
            }
        }catch (e){
            return response.status(404).send("User not deleted, an error occurred");
        }

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
}

