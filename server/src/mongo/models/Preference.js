import {model} from 'mongoose';
import preferenceSchema from '../models_schema/preferenceSchema.js';

const Preference = model('Preference', preferenceSchema);
export default Preference;