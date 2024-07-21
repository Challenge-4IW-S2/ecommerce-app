import mongoose from 'mongoose';
const { Schema, model } = mongoose;

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

const Preference = model('Preference', preferenceSchema);
export { preferenceSchema };
export default Preference;