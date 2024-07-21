import ResetPasswordTokenMongo from "../mongo/repository/ResetPasswordTokenRepository.js";
import UserMongo from "../mongo/repository/UserRepository.js";

export const denormalizeResetPasswordTokenCreate = async (resetPasswordToken) => {
    const resetPasswordTokenRepository = new ResetPasswordTokenMongo();
    const addedResetPasswordToken = await resetPasswordTokenRepository.createOrUpdateResetPasswordToken(resetPasswordToken);

    const userRepository = new UserMongo();
    return await userRepository.updateSubdocument(resetPasswordToken.dataValues.user_id, 'reset_password_tokens', addedResetPasswordToken);
}

export const denormalizeResetPasswordTokenUpdate = async (resetPasswordToken) => {
    const resetPasswordTokenRepository = new ResetPasswordTokenMongo();
    const addedResetPasswordToken = await resetPasswordTokenRepository.createOrUpdateResetPasswordToken(resetPasswordToken);

    const userRepository = new UserMongo();
    return await userRepository.updateSubdocument(resetPasswordToken.dataValues.user_id, 'reset_password_tokens', addedResetPasswordToken);
}

export const denormalizeResetPasswordTokenDelete = async (resetPasswordToken) => {
    const resetPasswordTokenRepository = new ResetPasswordTokenMongo();
    await resetPasswordTokenRepository.deleteResetPasswordToken(resetPasswordToken.dataValues.id);

    const userRepository = new UserMongo();
    return await userRepository.deleteSubdocument(resetPasswordToken.dataValues.user_id, 'reset_password_tokens', resetPasswordToken);
}