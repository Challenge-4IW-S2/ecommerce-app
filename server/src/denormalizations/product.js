import ProductMongo from "../mongo/repository/ProductRepository.js";
import ProductPostgres from "../postgresql/repository/ProductRepository.js";

module.exports = async (productId) => {
    const product = await ProductPostgres.findById(productId);
    ProductMongo.createOrUpdateProduct(product);
}