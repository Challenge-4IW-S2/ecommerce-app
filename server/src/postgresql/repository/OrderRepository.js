import db from '../db.js';
import OrderModel from '../models/Order.js';

export default class OrderRepository {
    constructor() {
        this.Order = OrderModel(db.connection);
    }

    async findAll() {
        return await this.Order.findAll();
    }

    async findById(id) {
        return await this.Order.findByPk(id);
    }

    async findByOtherField(field, value) {
        return await this.Order.findOne({
            where: {
                [field]: value
            }
        });
    }

    async findByUser(user_id) {
        return await this.Order.findAll({
            where: {
                user_id: user_id
            }
        });
    }

    async createOrder(order) {
        return await this.Order.create({
            user_id: order.user_id,
            total_price: order.total_price,
            status: order.status,
            invoice: order.invoice
        });
    }

    async updateOrder(id, order) {
        return this.Order.update(order, {
            where: {
                id: id
            },
            individualHooks: true
        });
    }
}