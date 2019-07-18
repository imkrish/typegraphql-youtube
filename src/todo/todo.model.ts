import { Schema, model, Document } from "mongoose";
import { Todo } from "./todo.type";

export interface TodoDocument extends Todo, Document {}

export const TodoSchema = new Schema(
  {
    todo: { type: String, required: true },
    completed: { type: Boolean, required: true }
  },
  { timestamps: true }
);


