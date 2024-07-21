import {model} from 'mongoose';
import productSchema from '../models_schema/productSchema.js';

const Product = model('Product', productSchema);
export default Product;