import ProductMongo from "../mongo/repository/ProductRepository.js";
import StockEventRepository from "../mongo/repository/StockEventRepository.js";

export const denormalizeStockEventCreate = async (stockEvent) => {
    const stockEventRepository = new StockEventRepository();
    const addedStockEvent = await stockEventRepository.createOrUpdateStockEvent(stockEvent);

    const productRepository = new ProductMongo();
    return await productRepository.updateSubdocument(stockEvent.dataValues.product_id, 'stock_events', addedStockEvent);
}

export const denormalizeStockEventUpdate = async (stockEvent) => {
    const stockEventRepository = new StockEventRepository();
    const addedStockEvent = await stockEventRepository.createOrUpdateStockEvent(stockEvent);

    const productRepository = new ProductMongo();
    if (stockEvent._previousDataValues.category_id !== stockEvent.dataValues.category_id) {
        await productRepository.deleteSubdocument(
            stockEvent._previousDataValues.product_id,
            'stock_events',
            stockEvent.dataValues.id
        );
    }

    return await productRepository.updateSubdocument(stockEvent.dataValues.category_id, 'stock_events', addedStockEvent);
}

export const denormalizeStockEventDelete = async (stockEvent) => {
    const stockEventRepository = new StockEventRepository();
    const addedStockEvent = await stockEventRepository.deleteStockEvent(stockEvent);

    const productRepository = new ProductMongo();
    return await productRepository.deleteSubdocument(
        stockEvent.dataValues.product_id,
        'stock_events',
        stockEvent.dataValues.id
    );
}