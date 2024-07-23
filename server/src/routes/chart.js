import {ChartController} from '../controllers/ChartController.js';
import checkAuth from "../middlewares/checkAuth.js";
export default function (router) {
    router.get('/chart/totalByCategory', ChartController.getTotalByCategory);
    router.get('/chart/latestProducts', ChartController.getLatestProducts);
    router.get('/chart/averagePriceByCategory', ChartController.getAveragePriceByCategory);
    router.get('/chart/productsAddedOverTime', ChartController.getProductsAddedOverTime);
    router.get('/chart/getTheMostExpensiveProducts', ChartController.getMostExpensiveProductsByCategory);
    router.get('/chart/distributionByPrice', ChartController.getPriceDistribution);
    router.get('/chart/activeProductsByCategory', ChartController.getActiveProductsByCategory);
    router.get('/chart/newProductsByCategory', ChartController.getNewProductsByCategory);
    router.get('/chart/totalOrders', ChartController.getSalesByMonth);
    return router;
}