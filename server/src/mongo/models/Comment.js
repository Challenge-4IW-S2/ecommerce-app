import {model} from 'mongoose';
import commentSchema from '../models_schema/commentSchema.js';

const Comment = model('Comment', commentSchema);
export default Comment;