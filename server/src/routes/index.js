import { HelloController } from "../controllers/helloController.js";
import { ProductController } from "../controllers/ProductController.js";
import { UtilitiesController } from "../controllers/UtilitiesController.js";




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
    router.get("/", HelloController.index);

    // Model routes :(structure d'un modèle)
    router.get('/model/:modelName', UtilitiesController.fetchModelStructure);

    router.post("/searchProduct", ProductController.search);
    return router;
}
