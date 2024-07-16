import OrderRepository from "../postgresql/Repository/OrderRepository.js";

export class OrderController{
    static async getAllOrders(req, res){
        try {
            const orderRepository = new OrderRepository();
            const orders = await orderRepository.findAll();
            res.status(200).json(orders);

        } catch (error) {
            res.status(500).send(error.message);
        }
    }
    static async createOrder(req, res){
        try {
            const orderRepository = new OrderRepository();
            const order = await orderRepository.createOrder(req.body);
            res.status(201).json(order);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }
    static async getOrder(req, res){
        try {
            const orderRepository = new OrderRepository();
            const order = await orderRepository.findByPk(req.params.id);
            res.status(200).json(order);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }
    static async updateOrder(req, res){
        try {
            const orderRepository = new OrderRepository();
            const order = await orderRepository.findByPk(req.params.id);
            await order.update(req.body);
            res.status(200).json(order);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }


    static async getOrderByUser(req, res){
        try {
            const orderRepository = new OrderRepository();
            const order = await orderRepository.findByOtherField('user_id', req.params.id);
            res.status(200).json(order);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }
    static async getOrderByStatus(req, res){
        try {
            const orderRepository = new OrderRepository();
            const order = await orderRepository.findByOtherField('status', req.params.status);
            res.status(200).json(order);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }



}