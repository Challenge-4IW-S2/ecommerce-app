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

    async deleteUser(userId) {
        return this.User.findByIdAndDelete(userId);
    }

    async updateSubdocument(userId, subdocument, data) {
        const exists = await this.User.findOne({ _id: userId, [`${subdocument}._id`]: data._id });

        if (exists) {
            return this.User.findOneAndUpdate(
                { _id: userId, [`${subdocument}._id`]: data._id },
                { $set: { [`${subdocument}.$`]: data } },
                { new: true }
            );
        } else {
            return this.User.findByIdAndUpdate(
                userId,
                { $push: { [subdocument]: data } },
                { new: true }
            );
        }
    }

    async deleteSubdocument(userId, subdocument, subdocumentId) {
        return this.User.findByIdAndUpdate(
            userId,
            { $pull: { [subdocument]: { _id: subdocumentId } } },
            { new: true }
        );
    }
}