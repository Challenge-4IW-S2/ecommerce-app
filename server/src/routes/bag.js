import { BagController } from "../controllers/BagController.js";

export default function (router) {
    router.get("/get-bag", BagController.getBag);
    router.post("/init-bag", BagController.createBag);

    router.post("/add-product", BagController.addProduct);
    router.put("/update-product", BagController.updateProduct);
    router.delete("/remove-product", BagController.removeProduct);

    router.delete("/delete-bag", BagController.deleteBag);
    return router;
}