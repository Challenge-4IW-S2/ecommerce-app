import UserModel from '../models/User.js';

export default class UserRepository {
    constructor() {
        this.User = UserModel;
    }

    async createOrUpdateUser(user) {
        return this.User.findByIdAndUpdate(user.id, {
            email: user.email,
            password: user.password,
            firstname: user.firstname,
            lastname: user.lastname,
            phone: user.phone,
            is_verified: user.is_verified,
            role: user.role,
            deleted: user.deleted,
        }, {
            upsert: true,
            new: true,
        });
    }
}