import { BagController } from "../controllers/BagController.js";

export default function (router) {
    router.post("/init-bag", BagController.createBag);
    return router;
}