import {model} from 'mongoose';
import productPictureSchema from '../models_schema/productPictureSchema.js';

const ProductPicture = model('ProductPicture', productPictureSchema);
export default ProductPicture;