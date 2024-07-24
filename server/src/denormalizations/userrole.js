import UserRoleMongo from "../mongo/repository/UserRoleRepository.js";
import UserMongo from "../mongo/repository/UserRepository.js";

export const denormalizeUserRoleCreate = async (userRole) => {
    const userRoleRepository = new UserRoleMongo();
    return await userRoleRepository.createOrUpdateUserRole(userRole);
}

export const denormalizeUserRoleUpdate = async (userRole) => {
    const userRoleRepository = new UserRoleMongo();
    await userRoleRepository.createOrUpdateUserRole(userRole);

    // select all the users that have the role that is being updated and update the role inside all the users
    const userMongo = new UserMongo();
    const users = await userRoleRepository.getUsersByRole(userRole.dataValues.id);

    for (const user of users) {
        user.role = userRole;
        await userMongo.createOrUpdateUser(user);
    }
}


export const denormalizeUserRoleDelete = async (userRole) => {
    const userRoleRepository = new UserRoleMongo();
    return await userRoleRepository.deleteUserRole(userRole.dataValues.id);
}