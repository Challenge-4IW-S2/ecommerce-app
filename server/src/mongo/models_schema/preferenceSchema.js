import {Schema} from "mongoose";
const preferenceSchema = new Schema({
    _id: {
        type: 'UUID',
        required: true,
    },
    user_id: {
        type: 'UUID',
        required: true,
    },
    name: {
        type: 'String',
        required: true,
    },
    activated: {
        type: 'Boolean',
        default: false,
    },
});
export default preferenceSchema;