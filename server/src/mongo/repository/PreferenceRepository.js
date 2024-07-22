import PreferenceModel from '../models/Preference.js';

export default class PreferenceRepository {
    constructor() {
        this.Preference = PreferenceModel;
    }

    async createOrUpdatePreference(preference) {
        return this.Preference.findByIdAndUpdate(preference.id, {
            user_id: preference.user_id,
            name: preference.name,
            activated: preference.activated
        }, {
            upsert: true,
            new: true,
        });
    }

    async deletePreference(preferenceId) {
        return this.Preference.findByIdAndDelete(preferenceId);
    }
}