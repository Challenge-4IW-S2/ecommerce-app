import { HelloController } from "../controllers/helloController.js";
import { ProductController } from "../controllers/ProductController.js";
import { UserController } from "../controllers/UserController.js";
import {AuthController} from "../controllers/AuthController.js";
import {UtilitiesController} from "../controllers/UtilitiesController.js";
import {Router} from "express";
export const indexRouter = Router();




// User routes
// indexRouter.get("/users", UserController.getAllUsers);
// indexRouter.get("/users/:id", UserController.getUser);
// indexRouter.post("/users", UserController.createUser);
// indexRouter.put("/users/:id", UserController.updateUser);
// indexRouter.delete("/users/:id", UserController.deleteUser);
// indexRouter.post("/users/role", UserController.userRole);
// indexRouter.get("/users/roles", UserController.getAllUserRole);

// Product routes
export default function (router) {
    // TODO: CES ROUTES SONT A EXTERNALISER DANS UN FICHIER SEPARE
    //  EXCEPTÉ POUR LE '/' QUI DOIT RESTER ICI
    router.get("/", HelloController.index);

    // Model routes :(structure d'un modèle)
    router.get('/model/:modelName', UtilitiesController.fetchModelStructure);

    router.post("/searchProduct", ProductController.search);
    return router;
}
