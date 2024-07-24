import {Schema} from "mongoose";
import productPictureSchema from "./productPictureSchema.js";
import commentSchema from "./commentSchema.js";
import categorySchema from "./categorySchema.js";
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
    category: categorySchema,
    quantity: {
        type: Number,
        required: true,
        default: 0,
    },
    comments: commentSchema,
    productPictures: productPictureSchema
});
export default productSchema;