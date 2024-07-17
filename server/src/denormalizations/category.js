import CategoryMongo from "../mongo/repository/CategoryRepository.js";
import CategoryPostgres from "../postgresql/repository/CategoryRepository.js";

export default async (categoryId) => {
    console.log("categoryId",categoryId);
    // const category = await CategoryPostgres.findById(categoryId);
    // await CategoryMongo.createOrUpdateCategory(category);
}