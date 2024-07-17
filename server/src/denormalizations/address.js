import AddressMongo from "../mongo/repository/AddressRepository.js";

export const denormalizeAddress = async (addressId) => {
    const addressRepository = new AddressMongo();
    return await addressRepository.createOrUpdateAddress(addressId);
}

export const denormalizeAddressesDelete = async (addressId) => {
    const addressRepository = new AddressMongo();
    return await addressRepository.deleteAddress(addressId);
}