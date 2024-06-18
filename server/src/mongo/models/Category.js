import mongoose from 'mongoose';
const { Schema, model } = mongoose;

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

const Category = model('Category', categorySchema);
export default Category;