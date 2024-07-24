import checkAuth from "../middlewares/checkAuth.js";
import StockController from "../controllers/StockController.js";
import checkRole from "../middlewares/checkRole.js";
export default function (router) {

    router.get(
        "/history",
        checkAuth(),
        checkRole(['ROLE_ADMIN', 'ROLE_STORE_KEEPER']),
        StockController.getStockHistory
    );

    return router;
}