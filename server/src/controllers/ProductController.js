import ProductRepositoryMongo from "../mongo/Repository/ProductRepository.js";
import ProductRepository from "../postgresql/Repository/ProductRepository.js";

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

    static async createProduct(request, response) {
        try {
            const parameters = {
                name: request.body.name,
                price_ttc: request.body.price_ttc,
                price_ht: request.body.price_ht,
                slug: request.body.slug,
                description: request.body.description,
                category_id: request.body.category_id,
            }
            console.log(parameters)
            const productRepository = new ProductRepository();
            await productRepository.createProduct(parameters).then((response => {
                    response.json({
                        success: true,
                        message: 'Product successfully created',
                });
            }))
        } catch (error) {
            response.json({
                success: false,
                message: 'Product not created, an error occurred',
                e: error.message,
            });
        }
    }
}