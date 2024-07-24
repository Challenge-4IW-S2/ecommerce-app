import mongoose, {Schema} from "mongoose";
import userSchema from "./userSchema.js";
const userRoleSchema = new Schema({
    _id: {
        type: String,
        required: true,
        validate: {
            validator: function(v) {
                return /[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}/.test(v);
            },
            message: props => `${props.value} is not a valid UUID!`
        },
    },
    name: {
        type: String,
        required: true,
    },
    users: userSchema
});

export default userRoleSchema;