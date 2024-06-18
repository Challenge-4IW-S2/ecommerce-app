import CategoryModel from '../model/Category.js'

export default class CategoryRepository {
    constructor() {
        this.Category = CategoryModel;
    }

    createCategory(category) {
        return this.Category.create(category);
    }
}