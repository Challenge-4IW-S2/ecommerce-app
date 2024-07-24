import db from '../db.js';
import ProductModel from '../models/Product.js';
import CategoryRepository from './CategoryRepository.js';
import {Op} from "sequelize";

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

    async findAndCountAll(today) {
        return await this.Product.findAndCountAll({
            where: {
                createdAt: {
                    [Op.gte]: today
                }
            }
        });
    }

    async createProduct(product) {
        return await this.Product.create({
            name: product.name,
            description: product.description,
            price_ht: product.price_ht,
            is_active: product.is_active,
            token: product.token,
            slug: product.slug,
            category_id: await this.CategoryRepository.getCategoryId(product.category),
            quantity: product.quantity,
            low_stock_threshold: product.low_stock_threshold,
        });
    }

    async updateProduct(id, product) {
        return this.Product.update(product, {
            where: {
                id: id
            },
            individualHooks: true,
        });
    }

    async deleteProduct(id) {
        return await this.Product.destroy({
            where: {
                id: id
            },
            individualHooks: true
        });
    }
}