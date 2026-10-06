import dotenv from "dotenv";
dotenv.config();

import express from  "express";
import cors from 'cors';
import { connectDB } from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import todoRoutes from "./routes/todoRoutes.js";
import { jsonErrorHandler } from "./middlewares/error.middleware.js";

const app = express();
const PORT = process.env.PORT;

app.use(cors());
app.use(express.json());


app.use("/api/v1/auth", authRoutes);
app.use("/api/v1",todoRoutes);

app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

app.use(jsonErrorHandler);

const startServer = async () => {
  await connectDB();
  
  app.listen(PORT, () => {
    console.log(`The server is running on PORT ${PORT}`);
  });
};

startServer();