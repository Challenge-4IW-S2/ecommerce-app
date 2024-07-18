import PreferenceRepository from '../postgresql/repository/PreferenceRepository.js';
export default class PreferenceController {

    static async getAllPreferences(req,res,next) {
        try {
            const preferenceRepository = new PreferenceRepository();
            const preferences = await preferenceRepository.findAll();
            res.json(preferences);
        }catch (e) {
            console.log(e)
            next(e)
        }
    }

    static async getPreference(req, res, next) {
        const preferenceRepository = new PreferenceRepository();
        try {
            const preference = await preferenceRepository.findByOtherField("user_id", req.params.id);
            console.log(preference)
            if (preference) {
                res.json(preference);
            } else {
                res.sendStatus(404);
            }
        } catch (error) {
            next(error);
        }
    }
    static async createOrUpdatePreference(req, res, next) {
        const preferenceRepository = new PreferenceRepository();
        const params = {
            id: req.params.id,
            name: req.body.name,
            activated: req.body.activated,
        };
        try {
            const nbDeleted = await preferenceRepository.destroy(params.id);
            const preference = await preferenceRepository.create({ UserId: req.user.id, ...params });
            res.status(nbDeleted === 1 ? 200 : 201).json(preference);
        } catch (e) {
            next(e);
        }

            try {
                const preference = await preferenceRepository.createOrUpdatePreference();
                res.status(201).json(preference);
            } catch (error) {
                next(error);
            }
    }
}
