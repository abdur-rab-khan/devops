import mongoose from "mongoose";

const connectDB = async () => {
  const URL = process.env?.["MONGO_URL"] || "mongodb://localhost:27017";

  console.log("Connecting to mongodb...");

  if (!URL) throw new Error("There is no mongodb URL");

  try {
    const db = await mongoose.connect(URL, {
      dbName: "db",
      maxPoolSize: 10,
      socketTimeoutMS: 45000,
      serverSelectionTimeoutMS: 5000,
    });
    console.log("🥳 Mongodb connected");
    return db;
  } catch (err) {
    throw new Error("Failed to connect to mongodb");
  }
};

export default connectDB;
