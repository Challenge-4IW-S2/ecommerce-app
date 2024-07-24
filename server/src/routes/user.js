import {UserController} from "../controllers/UserController.js";
import {validateBody} from "../middlewares/validateBody.js";
import {
    ClientDeleteAccountSchema,
    ClientUpdatePasswordSchema,
    ClientUpdateProfileSchema,
    GetUsersSchema,
    UserUpdateSchema
} from "../schemas/UserSchema.js";
import checkAuth from "../middlewares/checkAuth.js";
import {OrderController} from "../controllers/OrderController.js";

export default function (router) {
    router.get("/users", UserController.getAllUsers);
    router.post("/user", UserController.createUser);
    router.get("/user/:id", UserController.getUser, validateBody(GetUsersSchema));
    router.put("/users/:id", validateBody(UserUpdateSchema) ,UserController.updateUser);
    router.delete("/user/:id",UserController.deleteUser);
   // router.get("/role", UserController.getAllUserRole);
    router.patch("/user/:id", UserController.updateUser);


    router.get(
        '/order-history',
        checkAuth(),
        OrderController.getOrderByUser
    );

    // router.get(
    //     '/address-list',
    //     checkAuth(),
    //     AddressController.getAllAddressesFromUser
    // );

    router.put(
        '/update-profile',
        checkAuth(),
        validateBody(ClientUpdateProfileSchema),
        UserController.updateClientProfile
    );
    router.put(
        '/change-password',
        checkAuth(),
        validateBody(ClientUpdatePasswordSchema),
        UserController.changeClientPassword
    );
    router.post(
        '/delete-account',
        checkAuth(),
        validateBody(ClientDeleteAccountSchema),
        UserController.deleteClientAccount
    );

    return router;
}

