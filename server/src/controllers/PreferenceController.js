import PreferenceRepository from '../postgresql/repository/PreferenceRepository.js';
import PreferencesList from "../postgresql/models/PreferencesList.js";
import PreferenceListRepository from "../postgresql/repository/PreferenceListRepository.js";
export default class PreferenceController {

    static async getAllPreferences(req,res,next) {
        try {

            const preferenceListRepository = new PreferenceListRepository();
            const preferences = await preferenceListRepository.findAll();
            const preferenceRepository = new PreferenceRepository();
            const userPreferences = await preferenceRepository.findByOtherField("user_id", req.user.id);
            const userPreferencesMap = userPreferences.reduce((acc, pref) => {
                acc[pref.name] = pref.activated;
                return acc;
            }, {});

            const combinedPreferences = preferences.map(pref => ({
                id: pref.dataValues.id,
                name: pref.dataValues.name,
                description: pref.dataValues.description,
                activated: userPreferencesMap[pref.dataValues.name] || false
            }));

            res.json(combinedPreferences);

        }catch (e) {
            next(e)
        }
    }

    static async getPreference(req, res, next) {
        const preferenceRepository = new PreferenceRepository();
        try {
            const preference = await preferenceRepository.findByOtherField("user_id", req.params.id);
            if (preference) {
                res.json(preference);
            } else {
                res.sendStatus(404);
            }
        } catch (error) {
            next(error);
        }
    }
    static async createOrUpdatePreference(req, response, next) {
        const preferenceRepository = new PreferenceRepository();
        const params = {
            name: req.body.name,
            activated: req.body.activated,
            user_id: req.user.id
        };
        try{
           const nbDeleted = await preferenceRepository.destroy(params.name,  req.user.id)
           if (params.activated) {
               const preference = await preferenceRepository.create(params);
              response.status(201).json(preference);
           }

        } catch (e) {
            next(e);
        }
    }
}
