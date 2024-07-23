import {Schema} from "mongoose";
import productPictureSchema from "./productPictureSchema.js";
import commentSchema from "./commentSchema.js";
const productSchema = new Schema({
    _id: {
        type: 'UUID',
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    price_ht: {
        type: Number,
        required: true,
    },
    is_active: {
        type: Boolean,
        required: true,
        default: true,
    },
    slug: {
        type: String,
        required: true,
        lowercase: true,
    },
    category_id: {
        type: 'UUID',
        required: true,
    },
    created_at: {
        type: Date,
        required: true,
        default: Date.now,
    },
    updated_at: {
        type: Date,
        required: true,
        default: Date.now,
    },
    comments: commentSchema,
    productPictures: productPictureSchema
});
export default productSchema;