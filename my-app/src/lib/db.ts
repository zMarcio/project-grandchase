import env from "dotenv";
import mongoose from "mongoose";

env.config();

const mongoURI = process.env.MONGODB_URI;

if (!mongoURI) {
  console.error("Please set the MONGODB_URI environment variable");
}

export async function client() {
  try {
    const connect = await mongoose.connect(mongoURI!);
    console.log("Successfully connected to MongoDB");
    return connect;
  } catch (error) {
    throw new Error("Failed to connect to MongoDB: " + error);
  }
}

export async function close() {
  try {
    const disconnect = await mongoose.disconnect();
    console.log("Successfully disconnected from MongoDB");
    return disconnect;
  } catch (error) {
    console.error("Failed to disconnect from MongoDB: " + error);
  }
}
