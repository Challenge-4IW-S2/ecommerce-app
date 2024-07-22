import {model} from "mongoose";
import addressSchema from "../models_schema/addressSchema.js";

const Address = model("Address", addressSchema);
export default Address;