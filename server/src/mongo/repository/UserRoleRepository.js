import UserRoleModel from '../models/UserRole.js';

export default class UserRoleRepository {
    constructor() {
        this.UserRole = UserRoleModel;
    }


    async findOneById(id) {
        return this.UserRole.findById(id);
    }

    async createOrUpdateUserRole(userRole) {
        return this.UserRole.findByIdAndUpdate(userRole.id, {
            name: userRole.name
        }, {
            upsert: true,
            new: true,
        });
    }

    async getUsersByRole(userRoleId) {
        return this.UserRole.findById(userRoleId, 'users', { lean: true });
    }

    async deleteUserRole(userRoleId) {
        return this.UserRole.findByIdAndDelete(userRoleId);
    }

    async updateSubdocument(userRoleId, subdocument, data) {
        const exists = await this.UserRole.findOne({ _id: userRoleId, [`${subdocument}._id`]: data._id });

        if (exists) {
            return this.UserRole.findOneAndUpdate(
                { _id: userRoleId, [`${subdocument}._id`]: data._id },
                { $set: { [`${subdocument}.$`]: data } },
                { new: true }
            );
        } else {
            return this.UserRole.findByIdAndUpdate(
                userRoleId,
                { $push: { [subdocument]: data } },
                { new: true }
            );
        }
    }

    async deleteSubdocument(userRoleId, subdocument, subdocumentId) {
        return this.UserRole.findByIdAndUpdate(
            userRoleId,
            { $pull: { [subdocument]: { _id: subdocumentId } } },
            { new: true }
        );
    }
}