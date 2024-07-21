import checkAuth from "../middlewares/checkAuth.js";
import StockController from "../controllers/StockController.js";
export default function (router) {

    router.get("/history", StockController.getStockHistory);


    return router;
}