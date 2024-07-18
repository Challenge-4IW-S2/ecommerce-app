import ProductRepositoryMongo from "../mongo/repository/ProductRepository.js";
import ProductRepository from "../postgresql/repository/ProductRepository.js";
import ProductPictureRepository from "../postgresql/repository/ProductPictureRepository.js";

export class ProductController {
    static async index(request, response) {
        try {
            const productRepositoryMongo = new ProductRepositoryMongo();
            const page = request.query.page;
            const order = request.query.order;
            const categories = request.query.categories;
            const valueMin = request.query.valueMin;
            const valueMax = request.query.valueMax;
            const names = request.query.names;

            await productRepositoryMongo.getAllProducts(page, order, categories, valueMin, valueMax, names).then((data) => {
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

    static async getMinAndMaxPrice(request, response) {
        try {
            const productRepositoryMongo = new ProductRepositoryMongo();
            await productRepositoryMongo.getMinAndMaxPrice().then((data) => {
                response.json({
                    min: data[0].min,
                    max: data[0].max,
                });
            });
        } catch (error) {
            response.json({
                message: error.message,
            });
        }
    }

    static async getProductsName(request, response) {
        const productRepositoryMongo = new ProductRepositoryMongo();
        const names = await productRepositoryMongo.getProductsName();
        response.status(201).json(names);
    }

    static async getProductBySlug(request, response) {
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

    static async createProduct(request, response,next) {
        const parameters = {
            name: request.body.name,
            price_ttc: request.body.price_ttc,
            price_ht: request.body.price_ht,
            slug: request.body.slug,
            description: request.body.description,
            category: request.body.category_id,
        }
        try {
            const productRepository = new ProductRepository();
            const slugAlreadyExists = await productRepository.findByOtherField("slug",parameters.slug);
            if (slugAlreadyExists) return response.sendStatus(400);
            const product = await productRepository.createProduct(parameters)
            response.status(201).json(product);
        } catch (error) {
            next(error)
        }
    }

    static async updateProduct(request, response,next) {
        const parameters = {
            name: request.body.name,
            price_ttc: request.body.price_ttc,
            price_ht: request.body.price_ht,
            slug: request.body.slug,
            description: request.body.description,
            category: request.body.category_id,
        }
        try {
            const productRepository = new ProductRepository();
            const product = await productRepository.updateProduct(request.params.id,parameters)
            response.status(200).json(product);
        } catch (error) {
            next(error)
        }
    }

    static async deleteProduct(request, response,next) {
        try {

            const productRepository = new ProductRepository();
            const productPicture = new ProductPictureRepository();

            const nbDelete =  await productRepository.deleteProduct(request.params.id)
            if (nbDelete === 1){
                const productPictures = await productPicture.findByOtherField("product_id", request.params.id);

                if (productPictures === null || productPictures.length === 0) {
                    return response.sendStatus(204);
                }

                const deletedPicture = await productPicture.deleteProductPicture(request.params.id)
                response.sendStatus(deletedPicture === 1 ? 204 : 404);

            }  else {
            response.sendStatus(404);
            }
        } catch (error) {
            next(error)
        }
    }
    static async getAllProducts(request, response) {
        try {
            const productRepository = new ProductRepository();
            const products = await productRepository.findAll();
            response.json(products);
        } catch (error) {
            response.json({
                message: error.message,
            });
        }
    }

    static async getProduct(request, response,next) {
        try {
            const productRepository = new ProductRepository();
            const product = await productRepository.findById(request.params.id);
            response.json(product);
        } catch (e) {
            next(e)
        }
    }
}