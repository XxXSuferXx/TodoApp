import { type Request, type Response } from "express";
import {User} from "../modals/userSchema.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const signup = async (req: Request, res: Response) => {
    try{
        const { username, password } = req.body;

        if( !username || !password) {
            return res.status(400).json({
                success: false,
                message: "Bad Request, UserName and Password are Required"
            })
        }

        const existingUser = await User.findOne({ username });

        if(existingUser) {
            return res.status(409).json({
                success: false,
                message: "Username is already taken"
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await User.create({
            username, 
            password: hashedPassword
        });

        return res.status(201).json({
            success: true,
            message: "User Successfully created",
            user: {
                id: newUser._id,
                username: newUser.username,
                role: newUser.role
            }
        });
    } catch (error: any) {
        console.log("Signup error:", error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        })
    }
};

export const signin = async (req: Request, res: Response) => {
    try {
        const { username, password } = req.body;

        if(!username || !password) {
            return res.status(400).json({
                success: false,
                message: "Bad Request: Username or Password are required"
            });
        }

        const existingUser = await User.findOne({username});

        const isPasswordValid = existingUser && await bcrypt.compare(password, existingUser.password);

        if(!existingUser || !isPasswordValid) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password"
            });
        }

        const token = jwt.sign({
            userId: existingUser._id,
            username: existingUser.username,
            role: existingUser.role
        }, process.env.JWT_SECRET as string,
        { expiresIn: "1h" });

        return res.status(200).json({
            success: true,
            message: "SignIn successful",
            data: {
                user: {
                    id: existingUser,
                    username: existingUser.username,
                    role: existingUser.role
                }
            },
            token: token
        })

    } catch(error: any) {
        console.log("Signin error:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server Error",
        })
    }
};
