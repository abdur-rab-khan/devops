import { model, Schema, Document } from "mongoose";

interface ITodo extends Document {
  title: string;
  completed: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const TodoSchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    completed: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const TodoModel = model<ITodo>("Todo", TodoSchema);

export { TodoModel };
