import UserRoleMongo from "../mongo/repository/UserRoleRepository.js";

export const denormalizeUserRole = async (userRoleId) => {
    const userRoleRepository = new UserRoleMongo();
    return await userRoleRepository.createOrUpdateUserRole(userRoleId);
}

export const denormalizeUserRoleDelete = async (userRoleId) => {
    const userRoleRepository = new UserRoleMongo();
    return await userRoleRepository.deleteUserRole(userRoleId);
}