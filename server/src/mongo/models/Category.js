import mongoose from 'mongoose';
import {productSchema} from "./Product.js";
const { Schema, model } = mongoose;

const categorySchema = new Schema({
    _id: {
        type: 'UUID',
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    products: productSchema
});

const Category = model('Category', categorySchema);
export default Category;