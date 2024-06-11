import ProductRepositoryMongo from "../mongo/Repository/ProductRepository.js";
import ProductRepository from "../postgresql/Repository/ProductRepository.js";

export class ProductController {
    constructor() {
        this.productRepository = new ProductRepository();
        this.productRepositoryMongo = new ProductRepositoryMongo();
    }

    static search(request, response) {
        const search = request.body.search;
        this.productRepositoryMongo.searchProduct(search).then((products) => {
            response.json({
                success: true,
                data: products,
            });
        }).catch((error) => {
            response.json({
                success: false,
                message: error.message,
            });
        });
    }
}