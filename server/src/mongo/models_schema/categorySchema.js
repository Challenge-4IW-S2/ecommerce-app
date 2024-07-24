import {Schema} from "mongoose";

const categorySchema = new Schema({
    _id: {
        type: 'UUID',
        required: true,
    },
    name: {
        type: String,
        required: true,
    }
});
export default categorySchema;