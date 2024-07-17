import UserRoleModel from '../models/UserRole.js';

export default class UserRoleRepository {
    constructor() {
        this.UserRole = UserRoleModel;
    }

    async createOrUpdateUserRole(userRole) {
        return this.UserRole.findByIdAndUpdate(userRole.id, {
            role: userRole.role,
        }, {
            upsert: true,
            new: true,
        });
    }
}