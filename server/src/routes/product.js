import {ProductController} from "../controllers/ProductController.js";
import {validateBody} from "../middlewares/validateBody.js";
import {ProductSchema} from "../schemas/ProductSchema.js";

export default function (router) {
    router.get("/products", ProductController.getAllProducts);
    router.get("/getProducts", ProductController.index);
    router.get("/getMinMaxPrice", ProductController.getMinAndMaxPrice);
    router.get("/getProductsNames", ProductController.getProductsName);
    router.get("/getProduct/:slug", ProductController.getProductBySlug);
    router.get("/searchProduct", ProductController.search);
    router.get("/product/:id", ProductController.getProduct);
    router.post("/product", validateBody(ProductSchema), ProductController.createProduct);
    router.patch("/product/:id", validateBody(ProductSchema), ProductController.updateProduct);
    router.delete("/product/:id", ProductController.deleteProduct);

    return router;
}