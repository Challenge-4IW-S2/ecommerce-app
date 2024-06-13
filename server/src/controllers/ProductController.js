import ProductRepositoryMongo from "../mongo/Repository/ProductRepository.js";
import ProductRepository from "../postgresql/Repository/ProductRepository.js";

export class ProductController {
    static async index(request, response) {
        try {
            const productRepositoryMongo = new ProductRepositoryMongo();
            const products = await productRepositoryMongo.getAllProducts();
            response.json({
                success: true,
                data: products,
            });
        } catch (error) {
            response.json({
                success: false,
                message: error.message,
            });
        }
    }

    static async search(request, response) {
        try {
            const productRepositoryMongo = new ProductRepositoryMongo();
            const search = request.query.search;
            const products = await productRepositoryMongo.searchProduct(search);
            response.json({
                success: true,
                data: products,
            });
        } catch (error) {
            response.json({
                success: false,
                message: error.message,
            });
        }
    }
}