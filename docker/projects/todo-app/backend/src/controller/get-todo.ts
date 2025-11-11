import type { Request, Response } from "express";
import AsyncHandler from "../utils/AsyncHandler.js";
import { isValidObjectId } from "mongoose";
import ErrorHandler from "../utils/ErrorHandler.js";
import { TodoModel } from "../modules/todo.module.js";

const getTodo = AsyncHandler(async (req: Request, res: Response) => {
  const { todoId } = req.params;

  if (!isValidObjectId(todoId)) {
    throw new ErrorHandler("Invalid todo id", 400);
  }

  const todo = await TodoModel.findById(todoId);

  if (!todo) {
    throw new ErrorHandler("Invalid todo id");
  }

  res.status(200).json({
    status: 200,
    success: true,
    todo,
    message: "Todo updated successfully",
  });
});

const getTodos = AsyncHandler(async (_: Request, res: Response) => {
  const todos = await TodoModel.find();
  res.status(200).json({
    status: 200,
    success: true,
    todos,
    message: "Todo updated successfully",
  });
});

export { getTodo, getTodos };
