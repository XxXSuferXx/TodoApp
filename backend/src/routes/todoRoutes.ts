import { Router } from "express";
import { addTodo } from "../controllers/todoController.js"
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = Router();

router.post("/todos", authMiddleware, addTodo);

export default router;