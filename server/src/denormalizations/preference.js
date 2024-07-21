import PreferenceMongo from "../mongo/repository/PreferenceRepository.js";
import UserMongo from "../mongo/repository/UserRepository.js";

export const denormalizePreferenceCreate = async (preference) => {
    const preferenceRepository = new PreferenceMongo();
    const addedPreference = await preferenceRepository.createOrUpdatePreference(preference);

    const userRepository = new UserMongo();
    return await userRepository.updateSubdocument(preference.dataValues.user_id, 'preferences', addedPreference);
}

export const denormalizePreferenceUpdate = async (preference) => {
    const preferenceRepository = new PreferenceMongo();
    const addedPreference = await preferenceRepository.createOrUpdatePreference(preference);

    const userRepository = new UserMongo();
    if (preference._previousDataValues.user_id === preference.dataValues.user_id) {
        return await userRepository.deleteSubdocument(preference.dataValues.user_id, 'preferences', addedPreference);
    }

    return await userRepository.updateSubdocument(preference.dataValues.user_id, 'preferences', addedPreference);
}

export const denormalizePreferenceDelete = async (preference) => {
    const preferenceRepository = new PreferenceMongo();
    await preferenceRepository.deletePreference(preference.dataValues.id);

    const userRepository = new UserMongo();
    return await userRepository.deleteSubdocument(preference.dataValues.user_id, 'preferences', preference);
}