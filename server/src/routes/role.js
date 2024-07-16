import {UserRoleController} from "../controllers/UserRoleController.js";
import {validateBody} from "../middlewares/validateBody.js";
import { UserRoleSchema} from "../schemas/UserRoleSchema.js";

export default function (router) {
    router.get("/role", UserRoleController.getAllUserRole);
    router.post("/userRole", validateBody(UserRoleSchema), UserRoleController.createUserRole);
    router.get("/role/:id", UserRoleController.getUserRole);
    router.patch("/userRole/:id", UserRoleController.updateUserRole);
    router.delete("/role/:id", UserRoleController.deleteUserRole);


    return router;
}
