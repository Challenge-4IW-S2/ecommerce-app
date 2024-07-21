import ProductMongo from "../mongo/repository/ProductRepository.js";
import CategoryMongo from "../mongo/repository/CategoryRepository.js";

export const denormalizeProductCreate = async (product) => {
    const productRepository = new ProductMongo();
    const addedProduct = await productRepository.createOrUpdateProduct(product);

    const categoryRepository = new CategoryMongo();
    return await categoryRepository.updateSubdocument(product.category_id, 'products', addedProduct);
}

export const denormalizeProductUpdate = async (product) => {
    const productRepository = new ProductMongo();
    const addedProduct = await productRepository.createOrUpdateProduct(product);

    const categoryRepository = new CategoryMongo();
    return await categoryRepository.updateSubdocument(product.category_id, 'products', addedProduct);
}

export const denormalizeProductDelete = async (product) => {
    const productRepository = new ProductMongo();
    await productRepository.deleteProduct(product.dataValues.id);

    const categoryRepository = new CategoryMongo();
    return await categoryRepository.deleteSubdocument(product.dataValues.category_id, 'products', product.dataValues.id);
}