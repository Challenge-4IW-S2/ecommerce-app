import db from '../db.js';
import Preference from '../models/Preference.js';
export default class PreferenceRepository {
    constructor() {
        this.Preference = Preference(db.connection);
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


    async destroy(preference_id, user_id) {
        return await this.Preference.destroy({
            where: {
                user_id: user_id,
                preference_id: preference_id
            },
            individualHooks: true
        });
    }

    async create(params) {
        return await this.Preference.create({
            preference_id: params.preference_id,
            activated: params.activated,
            user_id: params.user_id
        });
    }

    async update(id, params) {
        return this.Preference.update(params, {
            where: {
                id: id
            },
            returning: true,
            individualHooks: true
        });
    }


}