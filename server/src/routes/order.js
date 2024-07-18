import {OrderController} from "../controllers/OrderController.js";
import {validateBody} from "../middlewares/validateBody.js";
import {OrderSchema} from "../schemas/OrderSchema.js";

export default function (router) {

    router.get("/order/:id", OrderController.getOrder); //user connected
    router.get("/orders", OrderController.getAllOrders);
    router.post("/order", validateBody(OrderSchema), OrderController.createOrder); //seul les clients peuvent creer une commande pas les admin

    return router;
}