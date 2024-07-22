import ResetPasswordToken from '../models/ResetPasswordToken.js';

export default class ResetPasswordTokenRepository {
    constructor() {
        this.ResetPasswordToken = ResetPasswordToken;
    }

    async createOrUpdateResetPasswordToken(resetPasswordToken) {
        return this.ResetPasswordToken.findByIdAndUpdate(resetPasswordToken.id, {
            user_id: resetPasswordToken.user_id,
            token: resetPasswordToken.token,
            expires_at: resetPasswordToken.expires_at
        }, {
            upsert: true,
            new: true,
        });
    }

    async deleteResetPasswordToken(resetPasswordTokenId) {
        return this.ResetPasswordToken.findByIdAndDelete(resetPasswordTokenId);
    }
}