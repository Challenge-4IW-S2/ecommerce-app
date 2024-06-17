import Router from "express";
import { HelloController } from "../controllers/helloController.js";
import { ProductController } from "../controllers/ProductController.js";
import {AuthController} from "../controllers/AuthController.js";

export const indexRouter = Router();

indexRouter.get("/", HelloController.index);

//Auth
indexRouter.post("/signup", AuthController.signup);
indexRouter.post("/login", AuthController.login);

// Product routes
indexRouter.post("/searchProduct", ProductController.search);
