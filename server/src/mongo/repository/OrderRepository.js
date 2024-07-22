import OrderModel from '../models/Order.js';

export default class OrderRepository {
    constructor() {
        this.Order = OrderModel;
    }

    async createOrUpdateOrder(order) {
        return this.Order.findByIdAndUpdate(order.id, {
            user_id: order.user_id,
            product_id: order.product_id,
            quantity: order.quantity,
            price: order.price,
            status: order.status,
        }, {
            upsert: true,
            new: true,
        });
    }

    async deleteOrder(orderId) {
        return this.Order.findByIdAndDelete(orderId);
    }
}