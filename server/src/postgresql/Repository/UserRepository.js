import db from '../db.js';
import UserModel from '../model/User.js';
import UserRoleRepository from './UserRoleRepository.js';
import { v4 as uuidv4 } from 'uuid';

export default class UserRepository {
    constructor() {
        this.User = UserModel(db.connection);
        this.userRoleRepository = new UserRoleRepository();
    }

    async findAll() {
        return await this.User.findAll();
    }

    async findById(id) {
        return await this.User.findByPk(id);
    }

    async findByOtherField(field, value) {
        return await this.User.findOne({
            where: {
                [field]: value
            }
        });
    }

    async createUser(user) {
        return await this.User.create({
            id: uuidv4(),
            email: user.email,
            password: user.password,
            firstname: user.firstname,
            lastname: user.lastname,
            phone: user.phone,
            role: await this.userRoleRepository.getRoleId(user.role)
        });
    }

    async updateUser(id, user) {
        return await this.User.update(user, {
            where: {
                id: id
            }
        });
    }

    async deleteUser(id) {
        return await this.User.destroy({
            where: {
                id: id
            }
        });
    }
}