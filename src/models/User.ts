import mongoose, { Schema } from "mongoose";

export type User = {
  _id: mongoose.Types.ObjectId;
  email: string;
  password: string;
  created_at: Date;
  updated_at: Date;
};

const userSchema: Schema = new Schema<User>({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  updated_at: {
    type: Date,
    default: Date.now,
  },
});

export const UserModel = mongoose.model("User", userSchema);
