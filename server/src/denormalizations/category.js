import CategoryMongo from "../mongo/repository/CategoryRepository.js";

export const denormalizeCategory = async (categoryId) => {
    const categoryRepository = new CategoryMongo();
    return await categoryRepository.createOrUpdateCategory(categoryId);
}