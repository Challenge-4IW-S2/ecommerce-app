import mongoose from "mongoose";
const { Schema, model } = mongoose;

const userRoleSchema = new Schema({
    _id: {
        type: 'UUID',
        required: true,
    },
    name: {
        type: String,
        required: true,
    }
});

const UserRole = model("UserRole", userRoleSchema);
export default UserRole;