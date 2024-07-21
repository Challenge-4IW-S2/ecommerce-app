import {Schema} from "mongoose";
import productSchema from "./productSchema.js";

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
export default categorySchema;