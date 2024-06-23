import Router from "express";
import { HelloController } from "../controllers/helloController.js";
import { ProductController } from "../controllers/ProductController.js";
import {AuthController} from "../controllers/AuthController.js";
import {UtilitiesController} from "../controllers/UtilitiesController.js";
import {validateBody} from "../middlewares/validateBody.js";
import {CreationUserSchema, UserUpdateSchema} from "../schemas/UserSchema.js";
export const indexRouter = Router();

indexRouter.get("/", HelloController.index);

// Model routes :(structure d'un modèle)
indexRouter.get('/model/:modelName', UtilitiesController.fetchModelStructure);

//Auth
indexRouter.post("/signup", validateBody(CreationUserSchema),AuthController.signup);
indexRouter.post("/login", AuthController.login);

// User routes
indexRouter.get("/users", UserController.getAllUsers);
indexRouter.post("/users", UserController.createUser);
indexRouter.get("/users/:id", UserController.getUser);
indexRouter.put("/users/:id", validateBody(UserUpdateSchema) ,UserController.updateUser);
indexRouter.delete("/users/:id", UserController.deleteUser);
indexRouter.get("/role", UserController.getAllUserRole);

// Product routes
indexRouter.post("/searchProduct", ProductController.search);
