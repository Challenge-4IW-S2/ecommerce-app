import {UserRoleController} from "../controllers/UserRoleController.js";
import {validateBody} from "../middlewares/validateBody.js";
import { UserRoleSchema} from "../schemas/UserRoleSchema.js";
import checkAuth from "../middlewares/checkAuth.js";
import checkRole from "../middlewares/checkRole.js";

export default function (router) {

    router.get(
        "/userRoles",
        checkAuth(),
        checkRole(['ROLE_ADMIN']),
        UserRoleController.getAllUserRole
    );

    router.post(
        "/userRole",
        checkAuth(),
        checkRole(['ROLE_ADMIN']),
        validateBody(UserRoleSchema),
        UserRoleController.createUserRole
    );

    router.get(
        "/userRole/:id",
        checkAuth(),
        checkRole(['ROLE_ADMIN']),
        UserRoleController.getUserRole
    );

    router.patch(
        "/userRole/:id",
        checkAuth(),
        checkRole(['ROLE_ADMIN']),
        UserRoleController.updateUserRole
    );

    router.delete(
        "/userRole/:id",
        checkAuth(),
        checkRole(['ROLE_ADMIN']),
        UserRoleController.deleteUserRole
    );


    return router;
}
