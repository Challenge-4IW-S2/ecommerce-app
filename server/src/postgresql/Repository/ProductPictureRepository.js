import db from "../db.js";
import ProductPictureModel from "../models/ProductPicture.js";

export default class ProductPictureRepository {
    constructor() {
        this.ProductPicture = ProductPictureModel(db.connection);
    }

    async findAll() {
        return await this.ProductPicture.findAll();
    }

    async findById(id) {
        return await this.ProductPicture.findByPk(id);
    }

    async findByOtherField(field, value) {
        return await this.ProductPicture.findAll({
            where: {
                [field]: value,
            },
        });
    }

    async createProductPicture(productPicture) {
        return await this.ProductPicture.create({
            product_id: productPicture.product_id,
            url: productPicture.url,
        });
    }

    async updateProductPicture(id, productPicture) {
        return await this.ProductPicture.update(productPicture, {
            where: {
                id: id,
            },
            returning: true,
        });
    }

    async deleteProductPicture(id) {
        return await this.ProductPicture.destroy({
            where: {
                id: id,
            },
        });
    }
}