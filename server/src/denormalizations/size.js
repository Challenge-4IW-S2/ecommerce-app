import SizeMongo from "../mongo/repository/SizeRepository.js";

export const denormalizeSize = async (sizeId) => {
    const SizeRepository = new SizeMongo();
    return await SizeRepository.createOrUpdateProduct(sizeId);
}

export const denormalizeSizeDelete = async (sizeId) => {
    const SizeRepository = new SizeMongo();
    return await SizeRepository.deleteProduct(sizeId);
}