import mongoose from "mongoose";
import { MONGO_URI } from "../env";

export const connectDB = async () => {
  await mongoose.connect(MONGO_URI as string);
  console.log("MongoDB connected");
};
