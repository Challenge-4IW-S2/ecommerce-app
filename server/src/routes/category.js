import {CategoryController} from "../controllers/CategoryController.js";

export default function (router) {
    router.post('/category', CategoryController.createCategory);
    router.get('/categories', CategoryController.getAllCategories);
    router.get('/category/:id', CategoryController.getCategory);
    router.put('/category/:id', CategoryController.updatePutCategory);
    router.patch('/category/:id', CategoryController.updatePatchCategory);
    return router;
}