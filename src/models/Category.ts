import mongoose, { Schema } from "mongoose";

export type Category = {
  _id: mongoose.Types.ObjectId;
  name: string;
};

const categorySchema: Schema = new Schema<Category>({
  name: {
    type: String,
    required: true,
    unique: true,
  },
});

export const CategoryModel = mongoose.model("Category", categorySchema);
