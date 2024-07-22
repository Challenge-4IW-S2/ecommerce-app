import CategoryMongo from "../mongo/repository/CategoryRepository.js";

export const denormalizeCategoryCreate = async (category) => {
    const categoryRepository = new CategoryMongo();
    const addedCategory = await categoryRepository.createOrUpdateCategory(category);

    return addedCategory;
}

export const denormalizeCategoryUpdate = async (category) => {
    const categoryRepository = new CategoryMongo();
    const addedCategory = await categoryRepository.createOrUpdateCategory(category);

    return addedCategory;
}

export const denormalizeCategoryDelete = async (category) => {
    const categoryRepository = new CategoryMongo();
    return await categoryRepository.deleteCategory(category.dataValues.id);
}