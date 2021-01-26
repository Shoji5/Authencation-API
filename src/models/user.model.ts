import { Document, model, Schema } from "mongoose";

export interface IUser extends Document {
  name: string;
  uid: string;
  email: string;
  image: string;
  bio?: string;
  phone?: string;
  password: string;
  domain: "facebook" | "github" | "google" | "local";
}

const UserSchema = new Schema({
  name: { type: String, required: true },
  uid: { type: String, required: true },
  email: { type: String },
  image: { type: String },
  bio: { type: String },
  phone: { type: String },
  password: { type: String, required: true },
  domain: { type: String, required: true },
});

UserSchema.pre<IUser>("validate", function (next) {
  if (!this.uid) this.uid = this.id as string;
  if (!this.name) this.name = "User_" + this._id.toString().slice(-5);
  next();
});

const User = model<IUser>("user", UserSchema);

export default User;
