import Router from "express";
import { HelloController } from "../controllers/helloController.js";
import { ProductController } from "../controllers/ProductController.js";
import {AuthController} from "../controllers/AuthController.js";
import {UtilitiesController} from "../controllers/UtilitiesController.js";
import {validateBody} from "../middlewares/validateBody.js";
import {CreationUserSchema, GetUsersSchema, UserUpdateSchema, UserConnect} from "../schemas/UserSchema.js";
import {UserController} from "../controllers/UserController.js";
export const indexRouter = Router();

indexRouter.get("/", HelloController.index);

// Model routes :(structure d'un modèle)
indexRouter.get('/model/:modelName', UtilitiesController.fetchModelStructure);

//Auth
indexRouter.post("/signup",AuthController.signup);
indexRouter.post("/login",validateBody(UserConnect), AuthController.login);
indexRouter.post('/logout', (req, res) => {
    res.clearCookie('JWT', { httpOnly: true, signed: true });
    res.json({ message: "Logged out successfully" });
});


// User routes
indexRouter.get("/users", UserController.getAllUsers);
indexRouter.post("/users", UserController.createUser);
indexRouter.get("/user/:id", UserController.getUser, validateBody(GetUsersSchema));
indexRouter.put("/users/:id", validateBody(UserUpdateSchema) ,UserController.updateUser);
indexRouter.delete("/user/:id", UserController.deleteUser);
indexRouter.get("/role", UserController.getAllUserRole);
indexRouter.patch("/user/:id", UserController.updateUser);
// Product routes
indexRouter.post("/searchProduct", ProductController.search);
