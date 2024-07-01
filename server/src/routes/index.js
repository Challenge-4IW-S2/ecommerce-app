import Router from "express";
import { HelloController } from "../controllers/helloController.js";
import { ProductController } from "../controllers/ProductController.js";
import { UserController } from "../controllers/UserController.js";
import {AuthController} from "../controllers/AuthController.js";
import {UtilitiesController} from "../controllers/UtilitiesController.js";
export const indexRouter = Router();

indexRouter.get("/", HelloController.index);

// Model routes :(structure d'un modèle)
indexRouter.get('/model/:modelName', UtilitiesController.fetchModelStructure);

//Auth
indexRouter.post("/signup", AuthController.signup);
indexRouter.post("/login", AuthController.login);

// User routes
indexRouter.get("/users", UserController.getAllUsers);
indexRouter.get("/users/:id", UserController.getUser);
indexRouter.post("/users", UserController.createUser);
indexRouter.put("/users/:id", UserController.updateUser);
indexRouter.delete("/users/:id", UserController.deleteUser);
indexRouter.post("/users/role", UserController.userRole);
indexRouter.get("/users/roles", UserController.getAllUserRole);

// Product routes
indexRouter.get("/products", ProductController.index);
indexRouter.get("/product/:slug", ProductController.getProduct);
indexRouter.get("/searchProduct", ProductController.search);
