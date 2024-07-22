import {Schema} from "mongoose";
const productPictureSchema = new Schema({
    _id: {
        type: 'UUID',
        required: true,
    },
    url: {
        type: String,
        required: true,
    },
    product_id: {
        type: 'UUID',
        required: true,
    }
});

export default productPictureSchema;