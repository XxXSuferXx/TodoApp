import { Router } from "express";
import { addTodo, deleteTodo, getTodo, toggleTodo } from "../controllers/todoController.js"
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = Router();

router.post("/todos", addTodo);
router.get("/todos/:userId",getTodo);
router.delete("/todos/:userId/:todoId", deleteTodo);
router.patch("/todos/:userId/:todoId",toggleTodo);

export default router;