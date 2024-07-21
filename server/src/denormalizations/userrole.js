import UserRoleMongo from "../mongo/repository/UserRoleRepository.js";

export const denormalizeUserRoleCreate = async (userRole) => {
    const userRoleRepository = new UserRoleMongo();
    return await userRoleRepository.createOrUpdateUserRole(userRole);
}

export const denormalizeUserRoleUpdate = async (userRole) => {
    const userRoleRepository = new UserRoleMongo();
    return await userRoleRepository.createOrUpdateUserRole(userRole);
}


export const denormalizeUserRoleDelete = async (userRole) => {
    const userRoleRepository = new UserRoleMongo();
    return await userRoleRepository.deleteUserRole(userRole.dataValues.id);
}