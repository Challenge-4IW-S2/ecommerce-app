import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const typeSchema = new Schema({
        _id: {
        type: 'UUID',
        required: true,
    },
    name: {
        type: String,
        required: true,
    }
});

const Type = model('Type', typeSchema);
export default Type;