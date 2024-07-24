import OrderRepository from "../postgresql/Repository/OrderRepository.js";

export class OrderController{
    static async getAllOrders(req, res,next){
        try {
            const orderRepository = new OrderRepository();
            const orders = await orderRepository.findAll();
            res.json(orders);
        } catch (error) {
            next(error);
        }
    }

    static async getOrderByUser(req, res, next){
        try {
            const orderRepository = new OrderRepository();
            const orders = await orderRepository.findAllByOtherField('user_id', req.user.id);
            // remove user_id from all orders if orders is not empty
            if (orders) {
                orders.forEach(order => {
                    delete order.dataValues.user_id;
                });
            }
            res.json({orders} || {});
        } catch (error) {
            next(error);
        }
    }

    static async createOrder(req, res,next){
        try {
            const orderRepository = new OrderRepository();
            console.log("Creating order with data:", req.body);
            const order = await orderRepository.createOrder(req.body);
            res.status(201).json(order);
        } catch (error) {
            console.log("Error creating order",error);
            next(error);
        }
    }

    static async getOrder(req, res,next){
        try {
            const orderRepository = new OrderRepository();
            const order = await orderRepository.findById(req.params.id);
            if (order) {
                res.json(order);
            } else {
                res.sendStatus(404);
            }
        } catch (error) {
            next(error);
        }
    }


}