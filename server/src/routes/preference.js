import PreferenceController from '../controllers/PreferenceController.js';
import checkAuth from "../middlewares/checkAuth.js";

export default function (router) {

    router.get("/preference/:id",checkAuth(), PreferenceController.getPreference); //user connected
    router.get("/preferences", PreferenceController.getAllPreferences);
    router.put("/preferences", checkAuth(), PreferenceController.createOrUpdatePreference); //user connected

    return router;
}