import {model} from "mongoose";
import bagSchema from "../models_schema/bagSchema.js";

const Bag = model('Bag', bagSchema);
export default Bag;