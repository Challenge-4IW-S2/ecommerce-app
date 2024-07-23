import ProductRepository from "../mongo/repository/ProductRepository.js";
import Product from "../mongo/models/Product.js";
import UserRepository from "../postgresql/repository/UserRepository.js";
import OrderRepository from "../postgresql/repository/OrderRepository.js";

export  class ChartController {
    static async getTotalByCategory(req, res, next) {
        try {
            const productRepository = new ProductRepository();
            const salesByCategory = await productRepository.aggregateProducts([
                {$match: {is_active: true}},
                {$group: {_id: "$category_id", totalSales: {$sum: "$price_ht"}}},
                {$lookup: {from: "categories", localField: "_id", foreignField: "_id", as: "category"}},
                {$unwind: "$category"},
                {$project: {_id: 0, category: "$category.name", totalSales: 1}}
            ]);
            console.log(salesByCategory);
            res.json(salesByCategory);
        } catch (err) {
            res.status(500).send(err.toString());
        }
    }
    static async getAveragePriceByCategory(req, res, next) {
        try {
            const productRepository = new ProductRepository();
            const averagePriceByCategory = await productRepository.aggregateProducts([
                { $group: { _id: "$category_id", averagePrice: { $avg: "$price_ht" } } },
                { $lookup: { from: "categories", localField: "_id", foreignField: "_id", as: "category" } },
                { $unwind: "$category" },
                { $project: { _id: 0, category: "$category.name", averagePrice: 1 } }
            ]);

            res.json(averagePriceByCategory);
        } catch (err) {
            res.status(500).send(err.toString());
        }
    }


    static async getLatestProducts(req, res, next) {
        try {
            const productRepository = new ProductRepository();

            const latestProducts = await  productRepository.aggregateProducts([
                {$sort: {created_at: -1}},
                {$limit: 5},
                {$project: {_id: 0, name: 1, created_at: 1}}
            ]);

            res.json(latestProducts);
        } catch (err) {
            res.status(500).send(err.toString());
        }
    }


    // Get the number of products added over time
    static async getProductsAddedOverTime(req, res, next) {
        try {
            const productRepository = new ProductRepository();
            const productsAddedOverTime = await productRepository.aggregateProducts([
                {
                    $group: {
                        _id: { $substr: ["$created_at", 0, 7] }, // Group by year-month
                        totalProducts: { $sum: 1 }
                    }
                },
                { $sort: { _id: 1 } } // Sort by date
            ]);
            console.log(productsAddedOverTime);
            res.json(productsAddedOverTime);
        } catch (err) {
            res.status(500).send(err.toString());
        }
    }
    static async getMostExpensiveProductsByCategory(req, res, next) {
        try {
            const productRepository = new ProductRepository();
            const mostExpensiveProductsByCategory = await productRepository.aggregateProducts([
                { $sort: { price_ht: -1 } },
                { $group: { _id: "$category_id", mostExpensiveProduct: { $first: "$$ROOT" } } },
                { $lookup: { from: "categories", localField: "_id", foreignField: "_id", as: "category" } },
                { $unwind: "$category" },
                { $project: { _id: 0, category: "$category.name", product: "$mostExpensiveProduct.name", price: "$mostExpensiveProduct.price_ht" } }
            ]);
            console.log(mostExpensiveProductsByCategory);
            res.json(mostExpensiveProductsByCategory);
        } catch (err) {
            res.status(500).send(err.toString());
        }
    }
    static async getPriceDistribution(req, res, next) {
        try {
            console.log("PriceDistrib");
            const productRepository = new ProductRepository();
            const priceDistribution = await productRepository.aggregateProducts([
                { $bucket: {
                        groupBy: "$price_ht",
                        boundaries: [0, 50, 100, 150, 200, 250, 300],
                        default: "Other",
                        output: { count: { $sum: 1 } }
                    }}
            ]);
            console.log("PriceDistrib",priceDistribution);
            res.json(priceDistribution);
        } catch (err) {
            res.status(500).send(err.toString());
        }
    }
    static async getActiveInactiveProductsByCategory(req, res, next) {
        try {
            const productRepository = new ProductRepository();
            const activeInactiveProductsByCategory = await productRepository.aggregateProducts([
                { $group: { _id: { category_id: "$category_id", is_active: "$is_active" }, totalProducts: { $sum: 1 } } },
                { $lookup: { from: "categories", localField: "_id.category_id", foreignField: "_id", as: "category" } },
                { $unwind: "$category" },
                { $project: { _id: 0, category: "$category.name", is_active: "$_id.is_active", totalProducts: 1 } },
                { $sort: { category: 1, is_active: -1 } }
            ]);
            console.log(activeInactiveProductsByCategory);
            res.json(activeInactiveProductsByCategory);
        } catch (err) {
            res.status(500).send(err.toString());
        }
    }


    static async getActiveProductsByCategory(req, res, next) {
        try {
            const productRepository = new ProductRepository();
            const activeProductsByCategory = await productRepository.aggregateProducts([
                {$match: {is_active: true}},
                {$group: {_id: "$category_id", count: {$sum: 1}}},
                {$lookup: {from: "categories", localField: "_id", foreignField: "_id", as: "category"}},
                {$unwind: "$category"},
                {$project: {_id: 0, category: "$category.name", count: 1}}
            ]);
            res.json(activeProductsByCategory);
        } catch (err) {
            res.status(500).send(err.toString());
        }
    }

    static async getNewProductsByCategory(req, res, next) {
        try {
            const productRepository = new ProductRepository();
            const newProductsByCategory = await productRepository.aggregateProducts([
                {$sort: {created_at: -1}},
                {$group: {_id: "$category_id", count: {$sum: 1}}},
                {$lookup: {from: "categories", localField: "_id", foreignField: "_id", as: "category"}},
                {$unwind: "$category"},
                {$project: {_id: 0, category: "$category.name", count: 1}}
            ]);
            res.json(newProductsByCategory);
        } catch (err) {
            res.status(500).send(err.toString());
        }
    }


    static async getSalesByMonth(req, res, next) {
        try {
            const orderRepository = new OrderRepository();
            const salesByMonth = await orderRepository.getMonthlySales();
            res.json(salesByMonth);
        }catch (err) {
            res.status(500).send(err.toString());
        }
    }






}