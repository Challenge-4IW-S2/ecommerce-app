import db from "../db";
import ProductPictureModel from "../model/ProductPicture";
import { v4 as uuidv4 } from "uuid";

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
        return await this.ProductPicture.findOne({
            where: {
                [field]: value,
            },
        });
    }

    async createProductPicture(productPicture) {
        return await this.ProductPicture.create({
            id: uuidv4(),
            product_id: productPicture.product_id,
            url: productPicture.url,
        });
    }

    async updateProductPicture(id, productPicture) {
        return await this.ProductPicture.update(productPicture, {
            where: {
                id: id,
            },
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