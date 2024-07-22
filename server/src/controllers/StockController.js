import StockRepository from '../postgresql/repository/StockEventRepository.js';
import Sequelize from "sequelize";
export default class StockController {

    static async getStockHistory(req, res, next) {
        const stockRepository = new StockRepository();
        try {
            // query to get stock history for the last 3 months
            const stockHistory = await stockRepository.findAll({
                attributes: [
                    [Sequelize.fn('date_trunc', 'month', Sequelize.col('created_at')), 'month'],
                    [Sequelize.fn('sum', Sequelize.col('quantity')), 'total_quantity']
                ],
                group: ['month'],
                order: [[Sequelize.literal('month'), 'ASC']],
                where: {
                    created_at: {
                        [Sequelize.Op.gte]: Sequelize.literal("NOW() - INTERVAL '3 months'")
                    }
                }
            });

            res.status(200).json(stockHistory);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Failed to fetch stock history' });
        }

    }
}

/* const stockMovements = await StockMovement.findAll({
                attributes: [
                    [Sequelize.fn('date_trunc', 'month', Sequelize.col('created_at')), 'month'],
                    'product_id',
                    [Sequelize.fn('sum', Sequelize.literal(`CASE WHEN movement_type = 'in' THEN quantity ELSE -quantity END`)), 'net_quantity']
                ],
                group: ['month', 'product_id'],
                order: [[Sequelize.literal('month'), 'ASC']],
                where: {
                    created_at: {
                        [Sequelize.Op.gte]: Sequelize.literal("NOW() - INTERVAL '3 months'")
                    }
                }
            });
            const Product = new ProductRepository();

            const productQuantities = await Product.findAll({
                attributes: ['id', 'name', 'quantity']
            });

            const stockHistory = productQuantities.map(product => {
                const movements = stockMovements.filter(movement => movement.product_id === product.id);
                let totalQuantity = product.quantity;
                movements.reverse().forEach(movement => {
                    totalQuantity -= movement.quantity;
                });

                return {
                    product_id: product.id,
                    name: product.name,
                    history: movements.map(movement => ({
                        month: movement.month,
                        quantity: totalQuantity += movement.quantity
                    }))
                };
            });

            res.status(200).json(stockHistory); */