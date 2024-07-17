import ProductPicture from "../models/ProductPicture.js";

export default class ProductPictureRepository {
    constructor() {
        this.ProductPicture = ProductPicture;
    }

    async createOrUpdateProductPicture(productPicture) {
        return this.ProductPicture.findByIdAndUpdate(productPicture.id, {
            product_id: productPicture.product_id,
            url: productPicture.url,
        }, {
            upsert: true,
            new: true,
        });
    }
}