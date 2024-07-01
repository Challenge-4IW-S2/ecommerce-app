import {ProductController} from "../controllers/ProductController.js";

export default function (router) {
    router.get("/products", ProductController.index);
    router.get("/product/:slug", ProductController.getProduct);
    router.get("/searchProduct", ProductController.search);
    return router;
}

