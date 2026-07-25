import { type NextFunction, type Request, type Response } from "express";
import jwt from "jsonwebtoken";

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
    
    if(!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({
            success: false,
            message: "Access Denied. No token provided"
        })
    } 

    const token = authHeader.split(" ")[1];

    if(!token) {
        return res.status(401).json({
            success: false,
            message: "Access denied. Token missing"
        });
    }

    try{

        const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
        req.body.userId = (decoded as any).userId;

        next();

    } catch(error: any) {
        console.log("Middleware Error: ", error);
        return res.status(500).json({
            success: false,
            message: "Internal server Error",
            error: error.message
        })
    }
}
