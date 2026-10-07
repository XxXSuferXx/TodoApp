import { type Request, type Response } from "express";
import { User } from "../modals/userSchema.js";

export const getAllUsers = async (req: Request, res: Response) => {
    try {
        const users = await User.find();

        return res.status(200).json({
            success: true,
            count: users.length,
            data: users
        });
    } catch (error: any) {
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
};