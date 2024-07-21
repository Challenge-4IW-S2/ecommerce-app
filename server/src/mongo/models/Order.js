import {model} from 'mongoose';
import orderSchema from '../models_schema/orderSchema.js';

const Order = model('Order', orderSchema);
export default Order;