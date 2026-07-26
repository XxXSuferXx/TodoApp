import { Router } from "express";
import { addTodo, deleteTodo, getTodo } from "../controllers/todoController.js"
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = Router();

router.post("/todos", authMiddleware, addTodo);
router.get("/todos/:userId", authMiddleware, getTodo);
router.delete("/todos/:userId/:todoId", authMiddleware, deleteTodo);

export default router;