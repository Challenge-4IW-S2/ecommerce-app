import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const productSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    picture: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    priceHT: {
        type: Number,
        required: true,
    },
    priceTTC: {
        type: Number,
        required: true,
    },
    isActive: {
        type: Boolean,
        required: true,
        default: true,
    },
    token: {
        type: String,
        required: true,
        lowercase: true,
    },
    category: {
        type: String,
        required: true,
    }
});

const Product = model('Product', productSchema);
export default Product;