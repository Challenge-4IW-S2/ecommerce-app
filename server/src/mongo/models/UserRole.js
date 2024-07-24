import {model} from "mongoose";
import userRoleSchema from "../models_schema/userRoleSchema.js";

const UserRole = model("UserRole", userRoleSchema);
export default UserRole;