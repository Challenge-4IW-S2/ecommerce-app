import mongoose from 'mongoose';
import Address from "./Address.js";
import {addressSchema} from "./Address.js";
import {commentSchema} from "./Comment.js";
import {orderSchema} from "./Order.js";
import {preferenceSchema} from "./Preference.js";
import {resetPasswordTokenSchema} from "./ResetPasswordToken.js";
import {wishlistSchema} from "./Wishlist.js";
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
    },
    // i want to declare addresses that is a subdocument of user here (use the Address model)
    addresses: addressSchema,
    comments : commentSchema,
    orders : orderSchema,
    preferences: preferenceSchema,
    reset_password_tokens: resetPasswordTokenSchema,
    wishlists: wishlistSchema
});

const User = model('User', userSchema);
export { userSchema };
export default User;