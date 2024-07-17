import ProductPictureMongo from "../mongo/repository/ProductPictureRepository.js";

export const denormalizeProductPicture = async (productPictureId) => {
    const productPictureRepository = new ProductPictureMongo();
    return await productPictureRepository.createOrUpdateProductPicture(productPictureId);
}