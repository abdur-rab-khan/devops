import type { Request, Response } from "express";
import { TodoModel } from "../modules/todo.module.js";
import AsyncHandler from "../utils/AsyncHandler.js";
import ErrorHandler from "../utils/ErrorHandler.js";

const createTodo = AsyncHandler(async (req: Request, res: Response) => {
  const { task = "" }: { task: string } = req.body ?? {};

  if (task.trimEnd().length === 0) {
    throw new ErrorHandler("Task is required to create todo", 400);
  }

  const createRes = await TodoModel.insertOne({
    title: task,
  });

  if (!createRes) {
    throw new ErrorHandler("Failed to create a task");
  }

  res.status(201).json({
    status: 201,
    success: true,
    message: "Todo created successfully",
  });
});

export default createTodo;
