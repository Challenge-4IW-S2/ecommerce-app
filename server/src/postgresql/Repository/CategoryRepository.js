import db from '../db.js';
import CategoryModel from '../models/Category.js';
import { v4 as uuidv4 } from 'uuid';

export default class CategoryRepository {
    constructor() {
        this.Category = CategoryModel(db.connection);
    }

    async findAll() {
        return await this.Category.findAll();
    }

    async findById(id) {
        return await this.Category.findByPk(id);
    }

    async findByOtherField(field, value) {
        return await this.Category.findOne({
            where: {
                [field]: value
            }
        });
    }

    async getCategoryId(category) {
        const categoryId = await this.Category.findOne({
            where: {
                name: category
            }
        });
        return categoryId.id;
    }

    async createCategory(category) {
        return await this.Category.create({
            id: uuidv4(),
            name: category.name
        });
    }

    async updateCategory(id, category) {
        return await this.Category.update(category, {
            where: {
                id: id
            }
        });
    }

    async deleteCategory(id) {
        return await this.Category.destroy({
            where: {
                id: id
            }
        });
    }
}