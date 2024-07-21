import mongoose from 'mongoose';
const { Schema, model } = mongoose;

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

const ProductPicture = model('ProductPicture', productPictureSchema);
export { productPictureSchema };
export default ProductPicture;