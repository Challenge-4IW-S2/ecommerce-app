import ProductRepository from "../mongo/repository/ProductRepository.js";
import Product from "../mongo/models/Product.js";

export  class ChartController {
    static async getSalesByCategory(req, res, next) {
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


    static async getLatestProducts(req, res, next) {
        try {
            const latestProducts = await Product.aggregate([
                {$sort: {created_at: -1}},
                {$limit: 5},
                {$project: {_id: 0, name: 1, created_at: 1}}
            ]);

            res.json(latestProducts);
        } catch (err) {
            res.status(500).send(err.toString());
        }
    }

    static async getAveragePrice(req, res, next) {
        try {
            const averagePriceByCategory = await Product.aggregate([
                {$match: {is_active: true}},
                {$group: {_id: "$category_id", avgPrice: {$avg: "$price_ht"}}},
                {$lookup: {from: "categories", localField: "_id", foreignField: "_id", as: "category"}},
                {$unwind: "$category"},
                {$project: {_id: 0, category: "$category.name", avgPrice: 1}}
            ]);

            res.json(averagePriceByCategory);
        } catch (err) {
            res.status(500).send(err.toString());
        }
    }

    static async getActiveProductsByCategory(req, res, next) {
        try {
            const activeProductsByCategory = await Product.aggregate([
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








}