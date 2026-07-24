import express from  "express";
import { jsonErrorHandler } from "./middlewares/error.middleware.js";
import mongoose from "mongoose";
import authRoutes from "./routes/authRoutes.js"

const app = express();

mongoose.connect("mongodb+srv://sharmarahul5889_db_user:zxcews2by@cluster0.ohgcdpe.mongodb.net/Todo-App")
  .then(() => console.log("Connected to MongoDB Atlas"))
  .catch(err => console.error("Connection failed:", err));

app.use(express.json());
app.use(jsonErrorHandler);

app.use("/auth", authRoutes);

app.listen(3000, ()=> {
    console.log("The server is running on PORT 3000");
})