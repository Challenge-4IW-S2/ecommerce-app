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
import checkRole from "../middlewares/checkRole.js";

export default function (router) {
    router.get("/users",
        checkAuth(),
        checkRole(['ROLE_ADMIN']),
        UserController.getAllUsers);
    router.post(
        "/user",
        checkAuth(),
        checkRole(['ROLE_ADMIN']),
        UserController.createUser
    );
    router.get("/user/:id",
        checkAuth(),
        checkRole(['ROLE_ADMIN']),
        UserController.getUser,
        validateBody(GetUsersSchema)
    );
    router.put(
        "/users/:id",
        checkAuth(),
        checkRole(['ROLE_ADMIN']),
        validateBody(UserUpdateSchema) ,
        UserController.updateUser
    );
    router.delete(
        "/user/:id",
        checkAuth(),
        checkRole(['ROLE_ADMIN']),
        UserController.deleteUser
    );
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

