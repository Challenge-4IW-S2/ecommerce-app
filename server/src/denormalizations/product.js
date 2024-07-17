import ProductMongo from "../mongo/repository/ProductRepository.js";

export const denormalizeProduct = async (productId) => {
    const ProductRepository = new ProductMongo();
    return await ProductRepository.createOrUpdateProduct(productId);
}

export const denormalizeProductDelete = async (productId) => {
    const ProductRepository = new ProductMongo();
    return await ProductRepository.deleteProduct(productId);
}