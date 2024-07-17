import ProductPictureMongo from "../mongo/repository/ProductPictureRepository.js";

export const denormalizeProductPicture = async (productPictureId) => {
    const productPictureRepository = new ProductPictureMongo();
    return await productPictureRepository.createOrUpdateProductPicture(productPictureId);
}

export const denormalizeProductPictureDelete = async (productPictureId) => {
    const productPictureRepository = new ProductPictureMongo();
    return await productPictureRepository.deleteProductPicture(productPictureId);
}