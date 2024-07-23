import {ChartController} from '../controllers/ChartController.js';
import checkAuth from "../middlewares/checkAuth.js";
export default function (router) {
    router.get('/chart/salesByCategory', ChartController.getSalesByCategory);
    router.get('/chart/latestProducts', ChartController.getLatestProducts);
    router.get('/chart/averagePriceByCategory', ChartController.getAveragePrice);
    router.get('/chart/activeProductsByCategory', ChartController.getActiveProductsByCategory);
    return router;
}