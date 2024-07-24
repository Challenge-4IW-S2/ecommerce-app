import {CategoryController} from "../controllers/CategoryController.js";
import {validateBody} from "../middlewares/validateBody.js";
import {CategorySchema} from "../schemas/CategorySchema.js";
import checkAuth from "../middlewares/checkAuth.js";
import checkRole from "../middlewares/checkRole.js";

export default function (router) {
    router.get('/header-categories', CategoryController.getHeaderCategories);

    router.post(
        '/category',
        checkAuth(),
        checkRole(['ROLE_ADMIN']),
        CategoryController.createCategory
    );

    router.get(
        '/categories',
        checkAuth(),
        checkRole(['ROLE_ADMIN']),
        CategoryController.getAllCategories
    );

    router.get(
        '/category/:id',
        checkAuth(),
        checkRole(['ROLE_ADMIN']),
        CategoryController.getCategory
    );

    router.put(
        '/category/:id',
        checkAuth(),
        checkRole(['ROLE_ADMIN']),
        validateBody(CategorySchema),
        CategoryController.updatePutCategory
    );

    router.patch(
        '/category/:id',
        checkAuth(),
        checkRole(['ROLE_ADMIN']),
        validateBody(CategorySchema),
        CategoryController.updatePatchCategory
    );

    router.delete(
        '/category/:id',
        checkAuth(),
        checkRole(['ROLE_ADMIN']),
        CategoryController.deleteCategory
    );

    router.get(
        '/getCategories',
        checkAuth(),
        checkRole(['ROLE_ADMIN']),
        CategoryController.getAllCategoriesMongo
    );

    return router;
}