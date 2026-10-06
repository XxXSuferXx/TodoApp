import mongoose from "mongoose";

export const connectDB = async (): Promise<void> => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URL as string);
    console.log(`MongoDB connected${conn.connection.host}`);
  } catch (error) {
    console.error("MongoDB Connection failed", error);
    process.exit(1); //Stop server from starting if DB connection fails
  }
};