import {ProductController} from "../controllers/ProductController.js";
import {validateBody} from "../middlewares/validateBody.js";
import {ProductSchema} from "../schemas/ProductSchema.js";

export default function (router) {
    router.get("/products", ProductController.index);
    router.get("/product/:slug", ProductController.getProduct);
    router.get("/searchProduct", ProductController.search);
    router.post("/product", ProductController.createProduct);
    return router;
}

