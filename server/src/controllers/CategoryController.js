import Category from "../postgresql/models/Category.js";
import CategoryRepository from "../postgresql/Repository/CategoryRepository.js";

export class CategoryController {
    static async createCategory(request, response) {
        const parameters = {
            name: request.body.name,
        }
        const categoryRepository = new CategoryRepository();
        categoryRepository.createCategory(parameters).then(res => {
            response.json({
                success: true,
                message: 'Category successfully created',
            });
        }).catch(error => {
            response.json({
                success: false,
                message: 'Category not created, an error occurred',
                e: error.message,
            });
        })
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
    static async updatePutCategory(request, response)
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
            response.json({
                success: false,
                message: 'Category not updated, an error occurred',
                e: e.message,
            });
        }
    }
    static async updatePatchCategory(request, response) {
        const parameters = {
            name: request.body.name,
        }
        const categoryRepository = new CategoryRepository();
        try {
            const id = request.params.id;
            const nbUpdated = await categoryRepository.updateCategory(id, parameters);
            const category = await categoryRepository.findByPk(id);
            response.status(nbUpdated === 1 ? 200 : 404).json(category);
        } catch (e) {
            response.json({
                success: false,
                message: 'Category not updated, an error occurred',
                e: e.message,
            });
        }
    }
    static async deleteCategory(request, response) {
        const categoryRepository = new CategoryRepository();
        const id = request.params.id;
        const nbDeleted = await categoryRepository.deleteCategory(id);
        response.status(nbDeleted === 1 ? 200 : 404).json({
            success: nbDeleted === 1,
            message: nbDeleted === 1 ? 'Category successfully deleted' : 'Category not found'
        });
    }

}