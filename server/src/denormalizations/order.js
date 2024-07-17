import OrderMongo from "../mongo/repository/OrderRepository.js";

export const denormalizeOrder = async (orderId) => {
    const orderRepository = new OrderMongo();
    return await orderRepository.createOrUpdateOrder(orderId);
}