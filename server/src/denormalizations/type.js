import TypeMongo from "../mongo/repository/TypeRepository.js";

export const denormalizeType = async (typeId) => {
    const TypeRepository = new TypeMongo();
    return await TypeRepository.createOrUpdateType(typeId);
}

export const denormalizeTypeDelete = async (typeId) => {
    const TypeRepository = new TypeMongo();
    return await TypeRepository.deleteType(typeId);
}