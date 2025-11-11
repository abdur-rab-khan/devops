import type { Request, Response } from "express";
import { TodoModel } from "../modules/todo.module.js";
import AsyncHandler from "../utils/AsyncHandler.js";
import ErrorHandler from "../utils/ErrorHandler.js";
import { isValidObjectId, Types } from "mongoose";

const updateTodo = AsyncHandler(async (req: Request, res: Response) => {
  const { todoId } = req.params;
  const {
    task = "",
    completed = null,
  }: { task: string; completed: boolean | null } = req.body ?? {};

  if (!isValidObjectId(todoId)) {
    throw new ErrorHandler("File ID is required");
  }

  if (!(task || typeof completed === "boolean")) {
    throw new ErrorHandler("Task or completed is required");
  }

  const updatedData = {};

  if (task.trim().length !== 0) {
    (updatedData as any).title = task;
  }

  if (typeof completed === "boolean") {
    (updatedData as any).completed = completed;
  }

  const update = await TodoModel.findByIdAndUpdate(
    new Types.ObjectId(todoId),
    updatedData
  );

  if (!update) {
    throw new ErrorHandler("Failed to update the todo", 500);
  }

  res.status(200).json({
    status: 200,
    success: true,
    message: "Todo updated successfully",
  });
});

export default updateTodo;
