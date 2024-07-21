import {model} from "mongoose";
import wishlistSchema from "../models_schema/wishlistSchema.js";

const Wishlist = model("Wishlist", wishlistSchema);
export default Wishlist;