import db from '../db.js';
import Preference from '../models/Preference.js';
export default class PreferenceRepository {
    constructor() {
        this.Preference = Preference(db.connection);
    }

    async createOrUpdatePreference(preference) {
        return await this.Preference.findByIdAndUpdate(preference.id, {
            name: preference.name,
            activated: preference.activated,
        }, {
            upsert: true,
            new: true

        });
    }

    async

    async getPreferenceById(id) {
        return await this.Preference.findById(id);
    }

    async findByOtherField(field, value) {
        return await this.Preference.findAll({
            where: {
                [field]: value
            }
        });
    }

    async findAll() {
        return await this.Preference.findAll();
    }


    async destroy(id) {
        return await this.Preference.destroy({
            where: {
                id: id
            },
            individualHooks: true
        });
    }

    async create(params) {
        return await this.Preference.create(params);
    }


}