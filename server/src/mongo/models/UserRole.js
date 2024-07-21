import mongoose from "mongoose";
import {userSchema} from "./User.js";
const { Schema, model } = mongoose;

const userRoleSchema = new Schema({
    _id: {
        type: 'UUID',
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    users: userSchema
});

const UserRole = model("UserRole", userRoleSchema);
export default UserRole;