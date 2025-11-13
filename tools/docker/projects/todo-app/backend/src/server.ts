import Express, { type Request, type Response } from "express";
import cors from "cors";

const app: Express.Application = Express();

// CORS Configuration
app.use(
  cors({
    origin: "http://localhost:5173", // Allow all origins (you can restrict this to specific domains)
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type"],
  })
);

app.use(Express.json());
app.use(Express.urlencoded({ extended: true }));

// ROUTES
import todoRoutes from "./routes/todo.routes.js";
import type ErrorHandler from "./utils/ErrorHandler.js";

app.use("/todo", todoRoutes);

// ERROR MIDDLEWARE
app.use(
  (
    err: ErrorHandler,
    _req: Request,
    res: Response,
    _next: Express.NextFunction
  ) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal server error";

    res.status(statusCode).json({
      success: false,
      message,
    });
  }
);

export default app;
