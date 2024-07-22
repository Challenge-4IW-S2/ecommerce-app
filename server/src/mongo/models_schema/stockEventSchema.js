import {Schema} from "mongoose";
import {v4 as uuidv4} from "uuid";
const stockEventSchema = new Schema({
    _id: {
        type: 'UUID',
        required: true,
    },
    product_id: {
        type: 'UUID',
        required: true,
    },
    event_type: {
        type: String,
        required: true,
    },
    stock_movement: {
        type: Number,
        required: true,
    },
});

export default stockEventSchema;