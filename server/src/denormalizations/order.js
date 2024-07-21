import OrderMongo from "../mongo/repository/OrderRepository.js";
import UserMongo from "../mongo/repository/UserRepository.js";

export const denormalizeOrderCreate = async (order) => {
    const orderRepository = new OrderMongo();
    const addedOrder = await orderRepository.createOrUpdateOrder(order);

    const userRepository = new UserMongo();
    return await userRepository.updateSubdocument(order.dataValues.user_id, 'orders', addedOrder);
}

export const denormalizeOrderUpdate = async (order) => {
    const orderRepository = new OrderMongo();
    const addedOrder = await orderRepository.createOrUpdateOrder(order);

    const userRepository = new UserMongo();
    return await userRepository.updateSubdocument(order.dataValues.user_id, 'orders', addedOrder);
}