import mongoose, { Schema, Document } from "mongoose";
import { User } from "@/interface/user_interface";

const UserSchema: Schema = new Schema({
  name: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const UserModel =
  mongoose.models.User || mongoose.model<User & Document>("User", UserSchema);

export default UserModel;
