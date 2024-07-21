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
    if (order._previousDataValues.user_id === order.dataValues.user_id) {
        return await userRepository.deleteSubdocument(order.dataValues.user_id, 'orders', addedOrder);
    }

    return await userRepository.updateSubdocument(order.dataValues.user_id, 'orders', addedOrder);
}