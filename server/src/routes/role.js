import {UserRoleController} from "../controllers/UserRoleController.js";
import {validateBody} from "../middlewares/validateBody.js";
import { UserRoleSchema} from "../schemas/UserRoleSchema.js";

export default function (router) {

    router.get("/userRoles", UserRoleController.getAllUserRole);
    router.post("/userRole", validateBody(UserRoleSchema), UserRoleController.createUserRole);
    router.get("/userRole/:id", UserRoleController.getUserRole);
    router.patch("/userRole/:id", UserRoleController.updateUserRole);
    router.delete("/userRole/:id", UserRoleController.deleteUserRole);


    return router;
}
