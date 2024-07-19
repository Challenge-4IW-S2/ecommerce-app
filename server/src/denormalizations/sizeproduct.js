import SizeProductMongo from "../mongo/repository/SizeProductRepository.js"

export const denormalizeSizeProduct = async (sizeProductId) => {
    const SizeProductRepository = new SizeProductMongo();
    return await SizeProductRepository.createOrUpdateSizeProduct(sizeProductId);
}

export const denormalizeSizeProductDelete = async (sizeProductId) => {
    const SizeProductRepository = new SizeProductMongo();
    return await SizeProductRepository.deleteSizeProduct(sizeProductId);
}