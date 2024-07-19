import mongoose from "mongoose";
const {Schema, model} = mongoose;

const sizeSchema = new Schema({
    _id: {
        type: 'UUID',
        required: true
    },
    name: {
        type: Number,
        required: true
    }
});

const Size = model('Size', sizeSchema);
export default Size;