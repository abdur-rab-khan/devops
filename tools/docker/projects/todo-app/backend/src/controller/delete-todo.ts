import type { Request, Response } from "express";
import { TodoModel } from "../modules/todo.module.js";
import AsyncHandler from "../utils/AsyncHandler.js";
import ErrorHandler from "../utils/ErrorHandler.js";
import { isValidObjectId } from "mongoose";

const deleteTodo = AsyncHandler(async (req: Request, res: Response) => {
  const { todoId } = req.params;

  if (!isValidObjectId(todoId)) {
    throw new ErrorHandler("Invalid todo id", 400);
  }

  const delTodo = await TodoModel.findByIdAndDelete(todoId);

  if (!delTodo) {
    throw new ErrorHandler("Failed to create a task");
  }

  res.status(201).json({
    status: 201,
    success: true,
    message: "Todo deleted successfully",
  });
});

export default deleteTodo;
