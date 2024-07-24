import CategoryMongo from "../mongo/repository/CategoryRepository.js";
import ProductMongo from "../mongo/repository/ProductRepository.js";

export const denormalizeCategoryCreate = async (category) => {
    const categoryRepository = new CategoryMongo();
    const addedCategory = await categoryRepository.createOrUpdateCategory(category);

    return addedCategory;
}

export const denormalizeCategoryUpdate = async (category) => {
    const categoryRepository = new CategoryMongo();
    await categoryRepository.createOrUpdateCategory(category);

    const productRepository = new ProductMongo();

    const products = await productRepository.getProductsByCategory(category.dataValues.id);
    if (products !== null) {
        for (const product of products) {
            console.log(product);
            product.category_id = {
                _id: category.dataValues.id,
                name: category.dataValues.name
            }
            await productRepository.createOrUpdateProduct(product);
        }

    }
}

export const denormalizeCategoryDelete = async (category) => {
    const categoryRepository = new CategoryMongo();
    return await categoryRepository.deleteCategory(category.dataValues.id);
}