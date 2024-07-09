import {UserController} from "../controllers/UserController.js";
import {validateBody} from "../middlewares/validateBody.js";
import {checkUserId, GetUsersSchema, UserUpdateSchema} from "../schemas/UserSchema.js";

export default function (router) {
    router.get("/users", UserController.getAllUsers);
    router.post("/users", UserController.createUser);
    router.get("/user/:id", UserController.getUser, validateBody(GetUsersSchema));
    router.put("/users/:id", validateBody(UserUpdateSchema) ,UserController.updateUser);
    router.delete("/user/:id", validateBody(checkUserId),UserController.deleteUser);
    router.get("/role", UserController.getAllUserRole);
    router.patch("/user/:id", UserController.updateUser);

    return router;
}

