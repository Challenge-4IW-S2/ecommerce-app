import AddressMongo from "../mongo/repository/AddressRepository.js";
import UserMongo from "../mongo/repository/UserRepository.js";

export const denormalizeAddressCreate = async (address) => {
    const addressRepository = new AddressMongo();
    const userRepository = new UserMongo();
    address.dataValues.user = await userRepository.findOneById(address.dataValues.user_id);

    const addedAddress = await addressRepository.createOrUpdateAddress(address.dataValues);
    return await userRepository.updateSubdocument(address.dataValues.user_id, 'addresses', addedAddress);
}

export const denormalizeAddressUpdate = async (address) => {
    const addressRepository = new AddressMongo();
    const userRepository = new UserMongo();

    const addedAddress = await addressRepository.createOrUpdateAddress(address);
    return await userRepository.updateSubdocument(address.dataValues.user_id, 'addresses', addedAddress);
}

export const denormalizeAddressDelete = async (address) => {
    const addressRepository = new AddressMongo();
    await addressRepository.deleteAddress(address.dataValues.id);

    const userRepository = new UserMongo();
    return await userRepository.deleteSubdocument(address.dataValues.user_id, 'addresses', address.dataValues.id);
}