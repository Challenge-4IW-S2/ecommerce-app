import {Schema} from "mongoose";
const commentSchema = new Schema({
    _id: {
        type: 'UUID',
        required: true,
    },
    comment: {
        type: String,
        required: true,
    },
    rating: {
        type: Number,
        required: true,
    },
    is_active: {
        type: Boolean,
        required: true,
    },
    user_id: {
        type: 'UUID',
        required: true,
    },
    product_id: {
        type: 'UUID',
        required: true,
    },
});

export default commentSchema;