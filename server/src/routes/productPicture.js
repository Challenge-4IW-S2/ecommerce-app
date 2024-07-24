import {validateBody} from "../middlewares/validateBody.js";
import {productPictureSchema} from "../schemas/productPictureSchema.js";
import {productPictureController} from "../controllers/productPictureController.js";
import checkAuth from "../middlewares/checkAuth.js";
import checkRole from "../middlewares/checkRole.js";

export default function productPictureRoutes(router) {

    router.post(
        "/productPicture",
        checkAuth(),
        checkRole(['ROLE_ADMIN', 'ROLE_STORE_KEEPER']),
        validateBody(productPictureSchema()),
        productPictureController.createProductPicture
    );

    router.get(
        "/productPicture/:productId/productPictures",
        checkAuth(),
        checkRole(['ROLE_ADMIN', 'ROLE_STORE_KEEPER']),
        productPictureController.getProductPicture
    );

    router.delete(
        "/productPicture/:id",
        checkAuth(),
        checkRole(['ROLE_ADMIN', 'ROLE_STORE_KEEPER']),
        productPictureController.deleteProductPicture
    );

    router.get(
        "/productPicture/:id",
        checkAuth(),
        checkRole(['ROLE_ADMIN', 'ROLE_STORE_KEEPER']),
        productPictureController.getProductPictureById
    );

    return router;
}