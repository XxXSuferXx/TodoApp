import { type NextFunction, type Request, type Response } from "express";
import jwt, { type JwtPayload } from "jsonwebtoken";

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
    
    if(!authHeader?.startsWith("Bearer ")) {
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
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload;
        req.user = {
            userId: decoded.userId,
            username: decoded.username,
            role: decoded.role,
        };
        
        next();

    } catch(error: any) {
        console.log("Middleware Error: ", error);
        const expired = error instanceof jwt.TokenExpiredError;
        return res.status(401).json({
            success: false,
            message: expired ? "Session expired, please sign in again" : "Invalid token",
        });
    }
}
