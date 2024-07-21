import AddressMongo from "../mongo/repository/AddressRepository.js";
import UserMongo from "../mongo/repository/UserRepository.js";

export const denormalizeAddressCreate = async (address) => {
    const addressRepository = new AddressMongo();
    const addedAddress = await addressRepository.createOrUpdateAddress(address);

    const userRepository = new UserMongo();
    return await userRepository.updateSubdocument(address.dataValues.user_id, 'addresses', addedAddress);
}

export const denormalizeAddressUpdate = async (address) => {
    const addressRepository = new AddressMongo();
    const addedAddress = await addressRepository.createOrUpdateAddress(address);

    const userRepository = new UserMongo();
    return await userRepository.updateSubdocument(address.dataValues.user_id, 'addresses', addedAddress);
}

export const denormalizeAddressDelete = async (address) => {
    const addressRepository = new AddressMongo();
    await addressRepository.deleteAddress(address.dataValues.id);

    const userRepository = new UserMongo();
    return await userRepository.deleteSubdocument(address.dataValues.user_id, 'addresses', address.dataValues.id);
}