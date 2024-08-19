import mongoose, { Schema } from "mongoose";
import { Task } from "./Task";
import { Category } from "./Category";

export type TaskCategory = {
  task_id: Task["_id"];
  category_id: Category["_id"];
};

const taskCategorySchema: Schema = new Schema<TaskCategory>({
  task_id: {
    type: Schema.Types.ObjectId,
    ref: "Task",
    required: true,
  },
  category_id: {
    type: Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
});

export const TaskCategoryModel = mongoose.model("TaskCategory", taskCategorySchema);
