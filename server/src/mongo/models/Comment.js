import mongoose from 'mongoose';
const { Schema, model } = mongoose;

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

const Comment = model('Comment', commentSchema);
export default Comment;