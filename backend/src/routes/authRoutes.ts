import { Router, type Request, type Response } from "express";
import {User} from "../modals/userSchema.js";

const router = Router();

router.post("/signup", async (req: Request, res: Response) => {
    try{
        const username = req.body.username;
        const password = req.body.password;

        if(!username || !password) {
            return res.status(400).json({
                message: "Bad Request, UserName and Password are Required"
            })
        }

        const existingUser = await User.findOne({ username });
        if(existingUser) {
            return res.status(409).json({
                message: "Username is already taken"
            });
        }

        const newUser = await User.create({
            username, password
        });

        return res.status(201).json({
            message: "User Successfully created",
            user: {
                id: newUser._id,
                username: newUser.username
            }
        });
    } catch (error: any) {
        console.log("Signup: error:", error);
        return res.status(500).json({
            message: "Internal Server Error",
            error: error.message
        })
    }
});

export default router;