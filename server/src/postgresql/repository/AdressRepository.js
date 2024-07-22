import db from '../db.js';
import AdressModel from '../models/Address.js';

export default class AdressRepository {
    constructor() {
        this.Adress = AdressModel(db.connection);
    }

    async findAll() {
        return await this.Adress.findAll();
    }

    async findById(id) {
        return await this.Adress.findByPk(id);
    }

    async findByOtherField(field, value) {
        return await this.Adress.findAll({
            where: {
                [field]: value
            }
        });
    }

    async createAdress(adress) {
        return await this.Adress.create({
            user_id: adress.user_id,
            street: adress.street,
            city: adress.city,
            postal_code: adress.postal_code,
            country: adress.country
        });
    }

    async updateAdress(id, adress) {
        return await this.Adress.update(adress, {
            where: {
                id: id
            },
            individualHooks: true
        });
    }

    async deleteAdress(id) {
        return await this.Adress.destroy({
            where: {
                id: id
            },
            individualHooks: true
        });
    }
    async deleteAdressFromUser(id) {
        return await this.Adress.destroy({
            where: {
                user_id: id
            }
        });
    }
}