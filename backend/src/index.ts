import express from  "express";
import { jsonErrorHandler } from "./middlewares/error.middleware.js";
import mongoose from "mongoose";
import authRoutes from "./routes/authRoutes.js";
import dotenv from "dotenv";
import todoRoutes from "./routes/todoRoutes.js"

dotenv.config();
const app = express();

mongoose.connect(process.env.MONGODB_URL as string)
  .then(() => console.log("Connected to MongoDB Atlas"))
  .catch(err => console.error("Connection failed:", err));

app.use(express.json());
app.use(jsonErrorHandler);

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1",todoRoutes);

app.listen(process.env.PORT, ()=> {
    console.log("The server is running on PORT 3000");
})