import db from '../db.js';
import UserModel from '../models/User.js';
import UserRoleRepository from './UserRoleRepository.js';
import { v4 as uuidv4 } from 'uuid';

export default class UserRepository {
    constructor() {
        this.User = new UserModel(db.connection);
        this.userRoleRepository = new UserRoleRepository();
    }

    async findAll() {
        return await this.User.findAll();
    }

    async findByPk(id) {
        return await this.User.findByPk(id);
    }

    async findOne(field, value) {
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


    async destroy(id) {
            return await this.User.destroy({
                where: {
                    id: id
                }
            });
        }
    async deleteUser(id) {
        return await this.updateUser(id, {
            email: null,
            password: null,
            firstname: null,
            lastname: null,
            phone: null,
            role: null,
            deleted: true,
        });
    }
}