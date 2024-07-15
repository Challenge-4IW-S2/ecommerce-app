import db from '../db.js';
import ResetPasswordTokenModel from '../models/ResetPasswordToken.js';

export default class ResetPasswordTokenRepository {
    constructor() {
        this.ResetPasswordToken = ResetPasswordTokenModel(db.connection);
    }

    async findAll() {
        return await this.ResetPasswordToken.findAll();
    }

    async findById(id) {
        return await this.ResetPasswordToken.findByPk(id);
    }

    async findByOtherField(fields, order) {
        return await this.ResetPasswordToken.findOne({
            where: fields,
            order: [order]
        });
    }

    async createResetPasswordToken(user) {
        return await this.ResetPasswordToken.create({
            user_id: user.id
        });
    }

    async updateResetPasswordToken(id, resetPasswordToken) {
        return await this.ResetPasswordToken.update(resetPasswordToken, {
            where: {
                id: id
            }
        });
    }

    async deleteResetPasswordToken(id) {
        return await this.ResetPasswordToken.destroy({
            where: {
                id: id
            }
        });
    }
}