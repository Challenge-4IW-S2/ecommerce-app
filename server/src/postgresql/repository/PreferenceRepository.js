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


    async destroy(name,user_id) {
        return await this.Preference.destroy({
            where: {
                name: name,
                user_id: user_id
            },
            individualHooks: true
        });
    }

    async create(params) {
        return await this.Preference.create({
            name: params.name,
            activated: params.activated,
            user_id: params.user_id
        });
    }


}