import {validateBody} from "../middlewares/validateBody.js";
import {productPictureSchema} from "../schemas/productPictureSchema.js";
import {productPictureController} from "../controllers/productPictureController.js";

export default function productPictureRoutes(router) {

    router.post("/productPicture", validateBody(productPictureSchema()), productPictureController.createProductPicture);
    router.get("/productPicture/:productId/productPictures", productPictureController.getProductPicture);
    router.delete("/productPicture/:id", productPictureController.deleteProductPicture);
    router.get("/productPicture/:id", productPictureController.getProductPictureById);

    return router;
}