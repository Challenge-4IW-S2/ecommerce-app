import CategoryModel from '../models/Category.js';

export default class CategoryRepository {
    constructor() {
        this.Category = CategoryModel;
    }

    async createOrUpdateCategory(category) {
        return this.Category.findByIdAndUpdate(category.id, {
            name: category.name,
        }, {
            upsert: true,
            new: true,
        });
    }
}