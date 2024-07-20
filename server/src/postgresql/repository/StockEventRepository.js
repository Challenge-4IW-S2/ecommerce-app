import db from '../db.js';
import StockEventModel from "../models/StockEvent.js";
import CategoryRepository from "./CategoryRepository.js";
export default class StockEventRepository {
    constructor(connection) {
        this.StockEvent = StockEventModel(db.connection);
    }

    async createStockEvent(stockEvent) {
        return await this.StockEvent.create(stockEvent);
    }

    async getStockEventsByProductId(productId) {
        return await this.StockEvent.findAll({
            where: {
                product_id: productId
            }
        });
    }

    async getStockEventsByProductIdAndType(productId, eventType) {
        return await this.StockEvent.findAll({
            where: {
                product_id: productId,
                event_type: eventType
            }
        });
    }
}