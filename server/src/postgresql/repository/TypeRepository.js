import db from "../db.js";
import TypeModel from "../models/Type.js";

export default class TypeRepository {
    constructor() {
        this.Type = TypeModel(db.connection);
    }

    async findAll() {
        return await this.Type.findAll();
    }

    async findByPk(id) {
        return this.Type.findByPk(id)
    }

    async getTypeId(type) {
        const typeId = await this.Type.findOne({
            where: {
                name: type
            }
        });
        return typeId.id;
    }

    async createType(type) {
        return await this.Type.create({
            name: type.name
        })
    }

    async updateType(id, type) {
        return await this.Type.update(type, {
            where: {
                id: id
            },
            individualHooks: true,
            returning: true
        })
    }

    async deleteType(id) {
        return await this.Type.destroy({
            where: {
                id: id
            },
            individualHooks: true
        })
    }
}