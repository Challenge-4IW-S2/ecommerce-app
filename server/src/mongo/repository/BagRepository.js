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
        return this.Bag.findOne({ sessionId: bag.sessionId });
    }

    updateBag(sessionId, bag) {
        return this.Bag.findOneAndUpdate({ sessionId, bag });
    }

    deleteBag(sessionId) {
        return this.Bag.findOneAndDelete({ sessionId });
    }
}