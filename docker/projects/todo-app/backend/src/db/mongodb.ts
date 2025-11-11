import mongoose from "mongoose";

const connectDB = async () => {
  const URL = process.env?.["MONGO_URL"] || "mongodb://localhost:27017";

  console.log("Connecting to mongodb...");

  if (!URL) throw new Error("There is no mongodb URL");

  try {
    const db = await mongoose.connect(URL, {
      dbName: "todo-app",
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    });
    console.log("🥳 Mongodb connected");
    return db;
  } catch (err) {
    throw new Error("Failed to connect to mongodb");
  }
};

export default connectDB;
