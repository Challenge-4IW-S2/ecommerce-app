import ProductRepositoryMongo from "../mongo/repository/ProductRepository.js";
import ProductRepository from "../postgresql/repository/ProductRepository.js";

export class ProductController {
    static async index(request, response) {
        try {
            const productRepositoryMongo = new ProductRepositoryMongo();
            const page = request.query.page;
            const order = request.query.order;
            await productRepositoryMongo.getAllProducts(page, order).then((data) => {
                response.json({
                    products: data.productsResults,
                    totalPages: data.totalPagesResults,
                });
            });
        } catch (error) {
            response.json({
                message: error.message,
            });
        }
    }

    static async getProduct(request, response) {
        try {
            const productRepositoryMongo = new ProductRepositoryMongo();
            const slug = request.params.slug;
            await productRepositoryMongo.getProduct(slug).then((data) => {
                response.json({
                    data,
                });
            });
        } catch (error) {
            response.json({
                message: error.message,
            });
        }
    }

    static async search(request, response) {
        try {
            const productRepositoryMongo = new ProductRepositoryMongo();
            const search = request.query.search;
            await productRepositoryMongo.searchProduct(search).then((data) => {
                response.json({
                    data,
                });
            });
        } catch (error) {
            response.json({
                message: error.message,
            });
        }
    }
}