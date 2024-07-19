import db from "../db";
import SizeModel from "../models/Size.js"

export default class SizeRepository {
    constructor() {
        this.Size = SizeModel(db.connection);
    }

    async findAll() {
        return await this.Size.findAll();
    }

    async findById(id) {
        return await this.Size.findByPk(id);
    }

    async createSize(size) {
        return await this.Size.create({
            name: size.name
        })
    }

    async updateSize(id, size) {
        return await this.Size.update(size, {
            where: {
                id: id
            },
            individualHooks: true
        })
    }

    async deleteSize(id) {
        return await this.Size.destroy({
            where: {
                id: id
            },
            individualHooks: true
        })
    }
}