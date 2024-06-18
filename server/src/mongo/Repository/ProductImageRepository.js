import ProductPicture from "../model/ProductPicture.js";

export default class ProductPictureRepository {
    constructor() {
        this.ProductPicture = ProductPicture;
    }

    createProductPicture(productPicture) {
        return this.ProductPicture.create(productPicture);
    }
}