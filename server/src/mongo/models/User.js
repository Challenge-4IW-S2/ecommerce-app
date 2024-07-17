import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const userSchema = new Schema({
    _id: {
        type: 'UUID',
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    firstname: {
        type: String,
        required: true,
    },
    lastname: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    is_verified: {
        type: Boolean,
        required: true
    },
    role: {
        type: 'UUID',
        required: true,
    },
    deleted: {
        type: Boolean,
        required: true
    }
});

const User = model('User', userSchema);
export default User;