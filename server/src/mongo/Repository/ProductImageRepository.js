import ProductPicture from "../models/ProductPicture.js";

export default class ProductPictureRepository {
    constructor() {
        this.ProductPicture = ProductPicture;
    }

    createProductPicture(productPicture) {
        return this.ProductPicture.create(productPicture);
    }
}