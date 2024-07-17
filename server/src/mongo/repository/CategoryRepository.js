import CategoryModel from '../models/Category.js';

export default class CategoryRepository {
    constructor() {
        this.Category = CategoryModel;
    }

    createOrUpdateCategory(category) {
        return this.Category.findOne
        ({
            where: {
                id: category.id
            }
        })
        .then((foundCategory) => {
            if (foundCategory) {
                return foundCategory.update(category);
            } else {
                return this.createCategory(category);
            }
        });
    }
    createCategory(category) {
        return this.Category.create(category);
    }
}