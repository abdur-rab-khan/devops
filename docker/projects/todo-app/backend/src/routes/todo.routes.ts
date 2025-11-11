import { Router } from "express";
import { getTodo, getTodos } from "../controller/get-todo.js";
import updateTodo from "../controller/update-todo.js";
import deleteTodo from "../controller/delete-todo.js";
import createTodo from "../controller/create-todo.js";

const routes: Router = Router();

routes.route("/").get(getTodos).post(createTodo);
routes.route("/:todoId").get(getTodo).put(updateTodo).delete(deleteTodo);

export default routes;
