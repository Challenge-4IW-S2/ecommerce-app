import {model} from 'mongoose';
import categorySchema from '../models_schema/categorySchema.js';

const Category = model('Category', categorySchema);
export default Category;