import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const SizeProductSchema = new Schema({
    _id: {
        type: 'UUID',
        required: true,
    },
    product_id: {
        type: 'UUID',
        required: true,
    },
    size_id: {
        type: 'UUID',
        required: true,
    },
})

const SizeProduct = model('SizeProduct', SizeProductSchema);
export default SizeProduct;