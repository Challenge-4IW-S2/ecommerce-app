import {OrderController} from "../controllers/OrderController.js";
import {validateBody} from "../middlewares/validateBody.js";
import {OrderSchema} from "../schemas/OrderSchema.js";
import checkAuth from "../middlewares/checkAuth.js";
import checkRole from "../middlewares/checkRole.js";

export default function (router) {

    router.get(
        checkAuth(),
        checkRole(['ROLE_ADMIN']),
        "/order/:id",
        OrderController.getOrder
    ); //user connected
    router.get(
        "/orders",
        checkAuth(),
        checkRole(['ROLE_ADMIN']),
        OrderController.getAllOrders
    );
    router.post(
        "/order",
        checkAuth(),
        checkRole(['ROLE_ADMIN']),
        validateBody(OrderSchema),
        OrderController.createOrder
    ); //seul les clients peuvent creer une commande pas les admin

    return router;
}