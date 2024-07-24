import {Schema} from "mongoose";

const addressSchema = new Schema({
    _id: {
        type: 'UUID',
        required: true,
    },
    user: {
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
            _id: {
                type: 'UUID',
                required: true,
            },
            name: {
                type: String,
                required: true,
            }
        },
        deleted: {
            type: Boolean,
            required: true
        },
    },
    street: {
        type: String,
        required: true,
    },
    city: {
        type: String,
        required: true,
    },
    postal_code: {
        type: String,
        required: true,
    },
    country: {
        type: String,
        required: true,
    }
});

export default addressSchema;