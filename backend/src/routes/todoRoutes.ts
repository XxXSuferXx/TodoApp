import { Router } from "express";
import { addTodo, deleteTodo, getTodo, toggleTodo } from "../controllers/todoController.js"
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = Router();

router.post("/todos", authMiddleware, addTodo);
router.get("/todos", authMiddleware, getTodo);
router.delete("/todos/:todoId", authMiddleware, deleteTodo);
router.patch("/todos/:todoId", authMiddleware, toggleTodo);

export default router;