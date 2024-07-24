import {Schema} from "mongoose";
const wishlistSchema = new Schema({
    _id: {
        type: 'UUID',
        required: true,
    },
    user_id: {
        type: 'UUID',
        required: true,
    },
    list: {
        type: [String],
        required: true,
    }
});

export default wishlistSchema;