import ProductMongo from "../mongo/repository/ProductRepository.js";
import CategoryMongo from "../mongo/repository/CategoryRepository.js";

export const denormalizeProductCreate = async (product) => {
    const productRepository = new ProductMongo();
    const categoryRepository = new CategoryMongo();
    product.category_id = await categoryRepository.findOneById(product.dataValues.category_id);

    return await productRepository.createOrUpdateProduct(product);
}

export const denormalizeProductUpdate = async (product) => {
    const productRepository = new ProductMongo();
    const categoryRepository = new CategoryMongo();
    const category = await categoryRepository.findOneById(product.dataValues.category_id);

    const productCopy = JSON.parse(JSON.stringify(product));
    productCopy.category_id = category
    if (product._previousDataValues.category_id !== product.dataValues.category_id) {
        await categoryRepository.deleteSubdocument(product._previousDataValues.category_id, 'category', product.dataValues.id);
    }

    return await productRepository.createOrUpdateProduct(productCopy);
}

export const denormalizeProductDelete = async (product) => {
    const productRepository = new ProductMongo();
    await productRepository.deleteProduct(product.dataValues.id);

    const categoryRepository = new CategoryMongo();
    return await categoryRepository.deleteSubdocument(product.dataValues.category_id, 'products', product.dataValues.id);
}