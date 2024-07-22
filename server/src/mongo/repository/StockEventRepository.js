import StockEventModel from "../models/StockEvent.js";

export default class StockEventRepository {
    constructor() {
        this.StockEvent = StockEventModel;
    }

    async createOrUpdateStockEvent(stockEvent) {
        return this.StockEvent.findByIdAndUpdate(stockEvent.id, {
            product_id: stockEvent.product_id,
            event_type: stockEvent.event_type,
            stock_level: stockEvent.stock_level
        }, {
            upsert: true,
            new: true,
        });
    }

    async deleteStockEvent(stockEventId) {
        return this.StockEvent.findByIdAndDelete(stockEventId);
    }

    async updateSubdocument(stockEventId, subdocument, data) {
        const exists = await this.StockEvent.findOne({ _id: stockEventId, [`${subdocument}._id`]: data._id });

        if (exists) {
            return this.StockEvent.findOneAndUpdate(
                { _id: stockEventId, [`${subdocument}._id`]: data._id },
                { $set: { [`${subdocument}.$`]: data } },
                { new: true }
            );
        } else {
            return this.StockEvent.findByIdAndUpdate(
                stockEventId,
                { $push: { [subdocument]: data } },
                { new: true }
            );
        }
    }

    async deleteSubdocument(stockEventId, subdocument, subdocumentId) {
        return this.StockEvent.findByIdAndUpdate(
            stockEventId,
            { $pull: { [subdocument]: { _id: subdocumentId } } },
            { new: true }
        );
    }
}