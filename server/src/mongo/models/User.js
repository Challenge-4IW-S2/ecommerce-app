import {model} from 'mongoose';
import userSchema from '../models_schema/userSchema.js';

const User = model('User', userSchema);
export default User;