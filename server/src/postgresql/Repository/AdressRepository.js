import db from '../db.js';
import AdressModel from '../models/Adress.js';
import { v4 as uuidv4 } from 'uuid';

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
        return await this.Adress.findOne({
            where: {
                [field]: value
            }
        });
    }

    async createAdress(adress) {
        return await this.Adress.create({
            id: uuidv4(),
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
            }
        });
    }

    async deleteAdress(id) {
        return await this.Adress.destroy({
            where: {
                id: id
            }
        });
    }
}