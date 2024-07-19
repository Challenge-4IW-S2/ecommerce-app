import TypeModel from "../models/Type.js";

export default class TypeRepository {
    constructor() {
        this.Type = TypeModel;
    }

    async createOrUpdateType(type) {
        return this.Type.findByIdAndUpdate(type.id, {
            name: type.name
        }, {
            upsert: true,
            new: true,
        })
    }

    async deleteType(typeId) {
        return this.Type.findByIdAndDelete(typeId)
    }
}