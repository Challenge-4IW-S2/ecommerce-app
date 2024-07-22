import AddressModel from '../models/Address.js';

export default class AddressRepository {
    constructor() {
        this.Address = AddressModel;
    }

    async findAddressesByUserId(userId) {
        return this.Address.find({ "user._id": userId });
    }

    async createOrUpdateAddress(address) {
        return this.Address.findByIdAndUpdate(address.id, {
            user: address.user,
            street: address.street,
            city: address.city,
            postal_code: address.postal_code,
            country: address.country,
        }, {
            upsert: true,
            new: true,
        });
    }

    async deleteAddress(addressId) {
        return this.Address.findByIdAndDelete(addressId);
    }
}