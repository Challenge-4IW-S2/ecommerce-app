import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const orderSchema = new Schema({
    _id: {
        type: 'UUID',
        required: true,
    },
    user_id: {
        type: 'UUID',
        required: true,
    },
    total_price: {
        type: Number,
        required: true,
    },
    status: {
        type: String,
        required: true,
    },
    invoice: {
        type: Object,
        required: true,
    }
});

const Order = model('Order', orderSchema);
export default Order;