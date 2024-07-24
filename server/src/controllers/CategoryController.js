import Category from "../postgresql/models/Category.js";
import CategoryRepository from "../postgresql/Repository/CategoryRepository.js";
import CategoryRepositoryMongo from "../mongo/repository/CategoryRepository.js";

export class CategoryController {
    static async getHeaderCategories(request, response) {
        const categoryRepository = new CategoryRepository();
        // get only first 4 inserted categories in the database
        const categories = await categoryRepository.findAll();
        //only return the first 4 categories and only their names
        const headerCategories = categories.slice(0, 4).map(category => category.name);
        response.json(headerCategories);
    }

    static async createCategory(request, response,next) {
        const parameters = {
            name: request.body.name,
        }
        try {
            const categoryRepository = new CategoryRepository();
            const category = categoryRepository.createCategory(parameters)
            response.status(201).json(category);

        }catch (e){
            next(e)
        }
    }

    static async getAllCategories(request, response) {
        const categoryRepository = new CategoryRepository();
        const categories = await categoryRepository.findAll();
        response.json(categories);
    }
    static async getCategory(request, response) {
        const categoryRepository = new CategoryRepository();
        const category = await categoryRepository.findByPk(request.params.id);
        if (!category) return response.status(404).send("Category not found");
        response.json(category);
    }
    static async updatePutCategory(request, response,next)
    {
        const parameters = {
            name: request.body.name,
        }
        const categoryRepository = new CategoryRepository();
        try {
            const id = request.params.id;
            const nbDeleted = await categoryRepository.deleteCategory(id);
            const category = await categoryRepository.createCategory({ id, ...parameters});
            response.status(nbDeleted === 1 ? 200 : 201).json(category);
        } catch (e) {
            next(e)
        }
    }
    static async updatePatchCategory(request, response) {
        const parameters = {
            name: request.body.name,
        }
        const categoryRepository = new CategoryRepository();
        try {
            const [nbUpdated,category] = await categoryRepository.updateCategory(request.params.id,parameters);
            if (nbUpdated === 1) return response.json(category[0]);
            if (nbUpdated === 0) return response.json(category[0]);
        } catch (e) {
            response.json({
                success: false,
                message: 'Category not updated, an error occurred',
                e: e.message,
            });
        }
    }
    static async deleteCategory(request, response,next) {
        try {
            const categoryRepository = new CategoryRepository();
            const nbDeleted = await categoryRepository.deleteCategory(request.params.id);
            response.status(nbDeleted === 1 ? 200 : 404).json()
        }catch (e) {
            next(e)
        }
    }

    static async getAllCategoriesMongo(request, response) {
        const categoryRepository = new CategoryRepositoryMongo();
        const categories = await categoryRepository.getAllCategories();
        response.json(categories);
    }
}