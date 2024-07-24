import {model} from 'mongoose';
import stockEventSchema from '../models_schema/stockEventSchema.js';

const StockEvent = model('StockEvent', stockEventSchema);
export default StockEvent;