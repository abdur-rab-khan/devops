import app from "./server.js";
import dotenv from "dotenv";
import connectDB from "./db/mongodb.js";

dotenv.config();

const PORT = 3000;

const startServer = async () => {
  try {
    await connectDB();

    app.listen(PORT, "0.0.0.0", () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error("Failed to start server:", err);
  }
};

startServer();
