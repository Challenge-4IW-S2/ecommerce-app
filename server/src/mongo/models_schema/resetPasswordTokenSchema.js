import {Schema} from "mongoose";
const resetPasswordTokenSchema = new Schema({
    _id: {
        type: 'UUID',
        required: true,
    },
    user_id: {
        type: 'UUID',
        required: true,
    },
    token: {
        type: String,
        required: true,
    },
    expires_at: {
        type: Date,
        required: true,
    }
});

export default resetPasswordTokenSchema;