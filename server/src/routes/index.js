import { ProductController } from "../controllers/ProductController.js";
import {AuthController} from "../controllers/AuthController.js";
import {UtilitiesController} from "../controllers/UtilitiesController.js"
import {validateBody} from "../middlewares/validateBody.js";
// import {CreationMail} from "../schemas/UserSchema.js";

//export const indexRouter = Router();

//indexRouter.post("/mail", validateBody(CreationMail),AuthController.sendMail())

export default function (router) {
    // TODO: CES ROUTES SONT A EXTERNALISER DANS UN FICHIER SEPARE
    //  EXCEPTÉ POUR LE '/' QUI DOIT RESTER ICI

    // Model routes :(structure d'un modèle)
    router.get('/model/:modelName', UtilitiesController.fetchModelStructure);

    router.post("/searchProduct", ProductController.search);
    return router;
}
