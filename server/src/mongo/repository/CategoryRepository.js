import CategoryModel from '../models/Category.js';

export default class CategoryRepository {
    constructor() {
        this.Category = CategoryModel;
    }

    async findOneById(categoryId) {
        return this.Category.findById(categoryId);
    }

    async createOrUpdateCategory(category) {
        return this.Category.findByIdAndUpdate(category.id, {
            name: category.name,
        }, {
            upsert: true,
            new: true,
        });
    }

    async deleteCategory(categoryId) {
        return this.Category.findByIdAndDelete(categoryId);
    }

    async getAllCategories() {
        return this.Category.find();
    }

    async updateSubdocument(categoryId, subdocument, data) {
        const exists = await this.Category.findOne({ _id: categoryId, [`${subdocument}._id`]: data._id });

        if (exists) {
            return this.Category.findOneAndUpdate(
                { _id: categoryId, [`${subdocument}._id`]: data._id },
                { $set: { [`${subdocument}.$`]: data } },
                { new: true }
            );
        } else {
            return this.Category.findByIdAndUpdate(
                categoryId,
                { $push: { [subdocument]: data } },
                { new: true }
            );
        }
    }

    async deleteSubdocument(categoryId, subdocument, subdocumentId) {
        return this.Category.findByIdAndUpdate(
            categoryId,
            { $pull: { [subdocument]: { _id: subdocumentId } } },
            { new: true }
        );
    }
}