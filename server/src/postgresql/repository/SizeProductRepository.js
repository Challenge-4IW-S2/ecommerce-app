import db from "../db.js";
import SizeProductModel from "../models/SizeProduct.js";

export default class SizeProductRepository {
    constructor() {
        this.SizeProduct = SizeProductModel(db.connection)
    }

    async findAll() {
        return await this.SizeProduct.findAll();
    }

    async findById(id) {
        return await this.SizeProduct.findByPk(id);
    }

    async createSizeProduct(sizeProduct) {
        return await this.create({
            product_id: sizeProduct.product_id,
            size_id: sizeProduct.size_id
        })
    }

    async updateSizeProduct(id, sizeProduct) {
        return await this.SizeProduct.update(sizeProduct,{
            where: {
                id: id
            },
            individualHooks: true
        })
    }

    async deleteSizeProduct(id) {
        return await this.SizeProduct.destroy({
            where: {
                id: id
            },
            individualHooks: true
        });
    }
}