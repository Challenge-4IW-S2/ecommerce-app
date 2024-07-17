import AddressModel from '../models/Address.js';

export default class AddressRepository {
    constructor() {
        this.Address = AddressModel;
    }

    async createOrUpdateAddress(address) {
        return this.Address.findByIdAndUpdate(address.id, {
            user_id: address.user_id,
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