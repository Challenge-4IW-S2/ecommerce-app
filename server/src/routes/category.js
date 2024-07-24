import {CategoryController} from "../controllers/CategoryController.js";
import {validateBody} from "../middlewares/validateBody.js";
import {CategorySchema} from "../schemas/CategorySchema.js";

export default function (router) {
    router.get('/header-categories', CategoryController.getHeaderCategories);

    router.post('/category', CategoryController.createCategory);
    router.get('/categories', CategoryController.getAllCategories);
    router.get('/category/:id', CategoryController.getCategory);
    router.put('/category/:id',validateBody(CategorySchema), CategoryController.updatePutCategory);
    router.patch('/category/:id',validateBody(CategorySchema), CategoryController.updatePatchCategory);
    router.delete('/category/:id', CategoryController.deleteCategory);
    router.get('/getCategories', CategoryController.getAllCategoriesMongo);
    return router;
}