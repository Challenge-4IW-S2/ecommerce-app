import {AddressController} from '../controllers/AddressController.js';
import {validateBody} from "../middlewares/validateBody.js";
import {AddressSchema} from "../schemas/AddressSchema.js";

export default function (router) {
    router.put("/address/:id",validateBody(AddressSchema), AddressController.updateAddress);
    router.delete("/address/:id", AddressController.deleteAddress);
    router.get("/address/:id", AddressController.getAddress);
    return router;
}