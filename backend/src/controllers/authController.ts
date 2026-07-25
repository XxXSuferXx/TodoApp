import { type Request, type Response } from "express";
import {User} from "../modals/userSchema.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const signup = async (req: Request, res: Response) => {
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

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await User.create({
            username, 
            password: hashedPassword
        });

        return res.status(201).json({
            message: "User Successfully created",
            user: {
                id: newUser._id,
                username: newUser.username
            }
        });
    } catch (error: any) {
        console.log("Signup error:", error);
        return res.status(500).json({
            message: "Internal Server Error",
            error: error.message
        })
    }
};

export const signin = async (req: Request, res: Response) => {
    try {
        const username = req.body.username;
        const password = req.body.password;

        if(!username || !password) {
            return res.status(400).json({
                message: "Bad Request: Username or Password are required"
            });
        }

        const existingUser = await User.findOne({username});

        if(!existingUser) {
            return res.status(401).json({
                message: "Invalid email or password"
            });
        }

        const isPasswordValid = await bcrypt.compare(password, existingUser.password);

        if(!isPasswordValid){
            return res.status(401).json({
                message: "Invalid Username or Password"
            })
        }
        const token = jwt.sign({
            userId: existingUser._id,
            username: existingUser.username
        }, process.env.JWT_SECRET as string);

        return res.status(200).json({
            message: "SignIn successful",
            token: token
        })

    } catch(error: any) {
        console.log("Signin error:", error);
        return res.status(500).json({
            message: "Internal server Error",
            error: error.message
        })
    }
};

    