import mongoose, { Schema } from "mongoose";
import { User } from "./User";

export type Task = {
  _id: mongoose.Types.ObjectId;
  user_id: User["_id"];
  task: string;
  is_completed: boolean;
  created_at: Date;
  updated_at: Date;
};

const taskSchema: Schema = new Schema<Task>({
  user_id: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  task: {
    type: String,
    required: true,
  },
  is_completed: {
    type: Boolean,
    default: false,
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

export const TaskModel = mongoose.model("Task", taskSchema);
