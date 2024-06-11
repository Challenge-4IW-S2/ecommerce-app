import Router from "express";
import { HelloController } from "../controllers/helloController.js";
import { ProductController } from "../controllers/ProductController.js";

export const indexRouter = Router();

indexRouter.get("/", HelloController.index);

// Product routes
indexRouter.post("/searchProduct", ProductController.search);
