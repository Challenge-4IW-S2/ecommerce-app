import {Schema} from "mongoose";
import wishlistSchema from "./wishlistSchema.js";
import resetPasswordTokenSchema from "./resetPasswordTokenSchema.js";
import preferenceSchema from "./preferenceSchema.js";
import orderSchema from "./orderSchema.js";
import commentSchema from "./commentSchema.js";
import addressSchema from "./addressSchema.js";
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
        _id: {
            type: String,
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
    addresses: addressSchema,
    comments : commentSchema,
    orders : orderSchema,
    preferences: preferenceSchema,
    reset_password_tokens: resetPasswordTokenSchema,
    wishlists: wishlistSchema
});

export default userSchema;