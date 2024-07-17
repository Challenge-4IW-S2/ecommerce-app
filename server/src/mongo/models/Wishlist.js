import mongoose from "mongoose";
const { Schema, model } = mongoose;

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

const Wishlist = model("Wishlist", wishlistSchema);
export default Wishlist;