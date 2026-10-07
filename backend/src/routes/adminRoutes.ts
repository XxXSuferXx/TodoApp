import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { requireRole } from "../middlewares/requireRole.js";
import { getAllUsers } from "../controllers/adminController.js";

const router = Router();

router.get("/users", authMiddleware, requireRole("admin"), getAllUsers);

export default router;