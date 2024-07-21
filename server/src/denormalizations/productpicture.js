import ProductPictureMongo from "../mongo/repository/ProductPictureRepository.js";
import ProductMongo from "../mongo/repository/ProductRepository.js";

export const denormalizeProductPictureCreate = async (productPicture) => {
    const productPictureRepository = new ProductPictureMongo();
    const addedProductPicture = await productPictureRepository.createOrUpdateProductPicture(productPicture);

    const productRepository = new ProductMongo();
    return await productRepository.updateSubdocument(productPicture.dataValues.product_id, 'pictures', addedProductPicture);
}


export const denormalizeProductPictureUpdate = async (productPicture) => {
    const productPictureRepository = new ProductPictureMongo();
    const addedProductPicture = await productPictureRepository.createOrUpdateProductPicture(productPicture);

    const productRepository = new ProductMongo();
    if (productPicture._previousDataValues.product_id !== productPicture.dataValues.product_id) {
        await productRepository.deleteSubdocument(productPicture._previousDataValues.product_id, 'pictures', productPicture.dataValues.id);
    }

    return await productRepository.updateSubdocument(productPicture.dataValues.product_id, 'pictures', addedProductPicture);
}

export const denormalizeProductPictureDelete = async (productPicture) => {
    const productPictureRepository = new ProductPictureMongo();
    await productPictureRepository.deleteProductPicture(productPicture.dataValues.id);

    const productRepository = new ProductMongo();
    return await productRepository.deleteSubdocument(productPicture.dataValues.product_id, 'pictures', productPicture.dataValues.id);
}