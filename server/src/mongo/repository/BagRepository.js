import BagModel from '../models/Bag.js';

export default class BagRepository {
    constructor() {
        this.Bag = BagModel;
    }

    getBag(sessionId) {
        return this.Bag.findOne({sessionId});
    }

    createBag(bag) {
        this.Bag.create(bag);
    }

    updateSessionId(oldSessionId, newSessionId) {
        if (this.Bag.findOne({ sessionId: newSessionId})) {
            this.Bag.deleteOne({ sessionId: oldSessionId });
        } else {
            this.Bag.updateOne({ sessionId: oldSessionId }, { sessionId: newSessionId });
        }
    }

    addProduct(sessionId, product) {
        this.Bag.updateOne({ sessionId }, { $push: { products: product } });
    }

    updateProduct(sessionId, product) {
        this.Bag.updateOne({ sessionId, 'products.productId': product.productId }, { $set: { 'products.$.quantity': product.quantity } });
    }

    removeProduct(sessionId, productId) {
        this.Bag.updateOne({ sessionId }, { $pull: { products: { productId } } });
    }

    deleteBagProducts(sessionId) {
        this.Bag.deleteOne({ sessionId });
        this.Bag.create({ sessionId, products: [] });
    }
}