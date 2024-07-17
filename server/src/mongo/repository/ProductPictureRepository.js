import ProductPicture from "../models/ProductPicture.js";

export default class ProductPictureRepository {
    constructor() {
        this.ProductPicture = ProductPicture;
    }

    createOrUpdateProductPicture(productPicture) {
        return this.ProductPicture.findOne
        ({
            where: {
                id: productPicture.id
            }
        })
        .then((foundProductPicture) => {
            if (foundProductPicture) {
                return foundProductPicture.update(productPicture);
            } else {
                return this.createProductPicture(productPicture);
            }
        });
    }
    // createProductPicture(productPicture) {
    //     return this.ProductPicture.create(productPicture);
    // }
}