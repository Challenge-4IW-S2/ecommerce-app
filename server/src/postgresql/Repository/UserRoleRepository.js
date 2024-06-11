import db from '../db.js'; 
import UserRoleModel from '../model/UserRole.js';
import { v4 as uuidv4 } from 'uuid';

export default class UserRoleRepository {
    constructor() {
        this.UserRole = UserRoleModel(db.connection);
    }

    async findAll() {
        return await this.UserRole.findAll();
    }

    async findById(id) {
        return await this.UserRole.findByPk(id);
    }

    async findByOtherField(field, value) {
        return await this.UserRole.findOne({
            where: {
                [field]: value
            }
        });
    }

    async getRoleId(role) {
        const roleId = await this.UserRole.findOne({
            where: {
                name: role
            }
        });
        return roleId.id;
    }

    async createUserRole(name) {
        return await this.UserRole.create({
            id: uuidv4(),
            name: name
        });
    }

    async updateUserRole(id, name) {
        return await this.UserRole.update({
            name: name
        }, {
            where: {
                id: id
            }
        });
    }

    async deleteUserRole(id) {
        return await this.UserRole.destroy({
            where: {
                id: id
            }
        });
    }
}