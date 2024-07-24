import PreferenceController from '../controllers/PreferenceController.js';
import checkAuth from "../middlewares/checkAuth.js";

export default function (router) {

    router.get("/preferences", checkAuth(), PreferenceController.getAllPreferences);
    router.post("/preferences", checkAuth(), PreferenceController.createOrUpdatePreference);

    router.delete("/preferences/:id", checkAuth(), PreferenceController.deletePreference);

    return router;
}