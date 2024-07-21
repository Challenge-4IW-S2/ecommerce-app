import {model} from "mongoose";
import resetPasswordTokenSchema from "../models_schema/resetPasswordTokenSchema.js";

const ResetPasswordToken = model("ResetPasswordToken", resetPasswordTokenSchema);
export default ResetPasswordToken;