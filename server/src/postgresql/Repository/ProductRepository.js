import db from '../db.js';
import ProductModel from '../models/Product.js';
import CategoryRepository from '../repository/CategoryRepository.js';

export default class ProductRepository {
    constructor() {
        this.Product = ProductModel(db.connection);
        this.CategoryRepository = new CategoryRepository();
    }

    async findAll() {
        return await this.Product.findAll();
    }

    async findById(id) {
        return await this.Product.findByPk(id);
    }

    async findByOtherField(field, value) {
        return await this.Product.findOne({
            where: {
                [field]: value
            }
        });
    }

    async createProduct(product) {
        return await this.Product.create({
            name: product.name,
            description: product.description,
            price_ht: product.price_ht,
            price_ttc: product.price_ttc,
            is_active: product.is_active,
            token: product.token,
            category_id: await this.CategoryRepository.getCategoryId(product.category)
        });
    }

    async updateProduct(id, product) {
        return await this.Product.update(product, {
            where: {
                id: id
            }
        });
    }

    async deleteProduct(id) {
        return await this.Product.destroy({
            where: {
                id: id
            }
        });
    }
}