import UserMongo from "../mongo/repository/UserRepository.js";
import UserRoleRepository from "../mongo/repository/UserRoleRepository.js";

export const denormalizeUserCreate = async (user) => {
    const userRepository = new UserMongo();
    const addedUser = await userRepository.createOrUpdateUser(user);

    const userRoleRepository = new UserRoleRepository();
    return await userRoleRepository.updateSubdocument(user.dataValues.role, 'users', addedUser);
}

export const denormalizeUserUpdate = async (user) => {
    const userRepository = new UserMongo();
    const addedUser = await userRepository.createOrUpdateUser(user);

    const userRoleRepository = new UserRoleRepository();
    if (user._previousDataValues.role !== user.dataValues.role) {
        await userRoleRepository.deleteSubdocument(user._previousDataValues.role, 'users', user.dataValues.id);
    }

    return await userRoleRepository.updateSubdocument(user.dataValues.role, 'users', addedUser);
}

export const denormalizeUserDelete = async (user) => {
    const userRepository = new UserMongo();
    await userRepository.deleteUser(user.dataValues.id);

    const userRoleRepository = new UserRoleRepository();
    return await userRoleRepository.deleteSubdocument(user.dataValues.role, 'users', user.dataValues.id);
}