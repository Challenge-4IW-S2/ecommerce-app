import {ProductController} from "../controllers/ProductController.js";
import {validateBody} from "../middlewares/validateBody.js";
import {ProductSchema} from "../schemas/ProductSchema.js";
import checkAuth from "../middlewares/checkAuth.js";
import checkRole from "../middlewares/checkRole.js";

export default function (router) {
    router.get("/products", ProductController.getAllProducts);
    router.get("/getProducts", ProductController.index);
    router.get("/getMinMaxPrice", ProductController.getMinAndMaxPrice);
    router.get("/getProductsNames", ProductController.getProductsName);
    router.get("/getProduct/:slug", ProductController.getProductBySlug);
    router.get("/searchProduct", ProductController.search);
    router.get("/product/:id", ProductController.getProduct);
    router.post(
        "/product",
        checkAuth(),
        checkRole(['ROLE_ADMIN']),
        validateBody(ProductSchema),
        ProductController.createProduct
    );
    router.patch(
        "/product/:id",
        checkAuth(),
        checkRole(['ROLE_ADMIN']),
        validateBody(ProductSchema),
        ProductController.updateProduct
    );
    router.delete(
        "/product/:id",
        checkAuth(),
        checkRole(['ROLE_ADMIN']),
        ProductController.deleteProduct
    );

    return router;
}