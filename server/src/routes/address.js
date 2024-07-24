import {AddressController} from '../controllers/AddressController.js';
import {validateBody} from "../middlewares/validateBody.js";
import {AddressSchema} from "../schemas/AddressSchema.js";
import checkAuth from "../middlewares/checkAuth.js";
import checkRole from "../middlewares/checkRole.js";

export default function (router) {
    router.put(
        "/address/:id",
        checkAuth(),
        checkRole(['ROLE_ADMIN']),
        validateBody(AddressSchema),
        AddressController.updateAddress
    );

    router.patch(
        "/address/:id",
        checkAuth(),
        checkRole(['ROLE_ADMIN']),
        AddressController.updateAddress
    );

    router.delete(
        "/address/:id",
        checkAuth(),
        checkRole(['ROLE_ADMIN']),
        AddressController.deleteAddress
    );

    router.get(
        "/address/:userId/addresses",
        checkAuth(),
        checkRole(['ROLE_ADMIN']),
        AddressController.getAllAddressByUserId
    );

    router.get(
        "/address/:id",
        checkAuth(),
        checkRole(['ROLE_ADMIN']),
        AddressController.getAddress
    );

    router.post(
        "/address",
        checkAuth(),
        checkRole(['ROLE_ADMIN']),
        validateBody(AddressSchema),
        AddressController.createAddress
    );
    return router;
}