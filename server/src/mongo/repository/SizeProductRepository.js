import SizeProductModel from "../models/SizeProduct.js";

export default class SizeProductRepository {
    constructor() {
        this.SizeProduct = SizeProductModel;
    }

    async createOrUpdateSizeProduct(sizeProduct) {
        return this.SizeProduct.findByIdAndUpdate(sizeProduct.id, {
            product_id: sizeProduct.product_id,
            size_id: sizeProduct.size_id
        }, {
            upsert: true,
            new: true
        })
    }

    async deleteSizeProduct(sizeProductId) {
        return this.SizeProduct.findByIdAndDelete(sizeProductId)
    }
}