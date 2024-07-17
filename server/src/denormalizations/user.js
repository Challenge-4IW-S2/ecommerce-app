import UserMongo from "../mongo/repository/UserRepository.js";

export const denormalizeUser = async (userId) => {
    const userRepository = new UserMongo();
    return await userRepository.createOrUpdateUser(userId);
}