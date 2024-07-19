import SizeModel from "../models/Size.js";

export default class SizeRepository {
    constructor() {
        this.Size = SizeModel;
    }

    async createOrUpdateSize(size) {
        return this.Size.findByIdAndUpdate(size.id, {
            name: size.name
        }, {
            upsert: true,
            new: true
        });
    }

        async deleteSize(sizeId) {
        return this.Size.findByIdAndDelete(sizeId);
    }
}