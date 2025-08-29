import { TUser } from "@/types";
import { Document, Model, model, models, Schema } from "mongoose";
import bcrypt from "bcryptjs";

export interface IUser extends Document, TUser {
  _id: string;
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new Schema<IUser>(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    name: { type: String, required: true },
    avatar: { type: String },
    role: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

const User = (models.User as Model<IUser>) || model<IUser>("User", userSchema);

export default User;
