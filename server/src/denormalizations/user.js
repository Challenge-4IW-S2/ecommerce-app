import UserMongo from "../mongo/repository/UserRepository.js";
import UserRoleRepository from "../mongo/repository/UserRoleRepository.js";
import AddressRepository from "../mongo/repository/AddressRepository.js";

export const denormalizeUserCreate = async (user) => {
    const userRepository = new UserMongo();
    const userRoleRepository = new UserRoleRepository();
    user.role = await userRoleRepository.findOneById(user.dataValues.role);

    const addedUser = await userRepository.createOrUpdateUser(user);

    return await userRoleRepository.updateSubdocument(user.dataValues.role, 'users', addedUser);
}

export const denormalizeUserUpdate = async (user) => {
    const userRepository = new UserMongo();
    const userRoleRepository = new UserRoleRepository();

    const userCopy = JSON.parse(JSON.stringify(user));

    if (user._previousDataValues.role !== user.dataValues.role) {
        await userRoleRepository.deleteSubdocument(user._previousDataValues.role, 'users', user.dataValues.id);

        userCopy.role = await userRoleRepository.findOneById(user.dataValues.role);
    }

    const addedUser = await userRepository.createOrUpdateUser(userCopy);

    //look into addresses and update the user inside them as well
    const addressRepository = new AddressRepository();
    const addresses = await addressRepository.findAddressesByUserId(user.dataValues.id);
    for (const address of addresses) {
        address.user = addedUser;
        await addressRepository.createOrUpdateAddress(address);
    }

    return await userRoleRepository.updateSubdocument(user.dataValues.role, 'users', addedUser);
}

export const denormalizeUserDelete = async (user) => {
    const userRepository = new UserMongo();
    await userRepository.deleteUser(user.dataValues.id);

    const userRoleRepository = new UserRoleRepository();
    return await userRoleRepository.deleteSubdocument(user.dataValues.role, 'users', user.dataValues.id);
}