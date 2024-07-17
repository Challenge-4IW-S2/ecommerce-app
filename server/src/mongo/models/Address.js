import mongoose from "mongoose";
const { Schema, model } = mongoose;

const addressSchema = new Schema({
    _id: {
        type: 'UUID',
        required: true,
    },
    user_id: {
        type: 'UUID',
        required: true,
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

const Address = model("Address", addressSchema);
export default Address;