import mongoose from "mongoose";
const { Schema, model } = mongoose;
import { v4 as uuidv4 } from 'uuid';

const bagSchema = new Schema({
    _id: {
        type: 'UUID',
        required: true,
        default: uuidv4,
    },
    sessionId: {
        type: 'UUID',
        required: true,
    },
    products: [
        {
            productId: {
                type: 'UUID',
                required: true,
                default: null,
            },
            quantity: {
                type: Number,
                required: true,
                default: 1,
            },
            color: {
                type: String,
                required: true,
                default: null,
            },
            size: {
                type: String,
                required: true,
                default: null,
            },
        }
    ],
});

const Bag = model('Bag', bagSchema);
export default Bag;