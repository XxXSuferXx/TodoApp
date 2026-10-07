import { type NextFunction, type Request, type Response } from "express";
import type { Role } from "../modals/userSchema.js";

export const requireRole = (...allowedRoles: Role[]) => {
    return (req: Request, res: Response, next: NextFunction) => {
       
        if (!req.user) {
            return res.status(401).json({
                success: false,
                message: "Not authenticated"
            });
        }

        if (!allowedRoles.includes(req.user.role as Role)) {
            return res.status(403).json({
                success: false,
                message: "Forbidden: you don't have permission to do this"
            });
        }

        next();
    };
};