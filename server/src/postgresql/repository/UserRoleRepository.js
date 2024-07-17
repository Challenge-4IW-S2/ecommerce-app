import db from '../db.js'; 
import UserRoleModel from '../models/UserRole.js';

export default class UserRoleRepository {
    constructor() {
        this.UserRole = new UserRoleModel(db.connection);
    }

    async findAll() {
        return await this.UserRole.findAll();
    }

    async findByPk(id) {
        return await this.UserRole.findByPk(id);
    }

    async findOne(field, value) {
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
            name: name
        });
    }

    async updateUserRole(id, name) {
        return await this.UserRole.update({
            name: name
        }, {
            where: {
                id: id
            },
            individualHooks: true
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