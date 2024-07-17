import ProductPictureMongo from "../mongo/repository/ProductPictureRepository.js";
import ProductPicturePostgres from "../postgresql/repository/ProductPictureRepository.js";

export default async (productPictureId) => {
    const productPicture = await ProductPicturePostgres.findById(productPictureId);
    ProductPictureMongo.createOrUpdateProductPicture(productPicture);
}