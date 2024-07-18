import UserRoleMongo from "../mongo/repository/UserRoleRepository.js";

export const denormalizeUserRole = async (userRole) => {
    const userRoleRepository = new UserRoleMongo();
    return await userRoleRepository.createOrUpdateUserRole(userRole);
}

export const denormalizeUserRoleDelete = async (userRoleId) => {
    const userRoleRepository = new UserRoleMongo();
    return await userRoleRepository.deleteUserRole(userRoleId);
}