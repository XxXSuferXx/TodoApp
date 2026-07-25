import { type Request, type Response } from "express";
import { Todo } from "../modals/todoSchema.js"

export const addTodo = async (req: Request, res: Response)=> {
    try{
        const userId = req.body.userId;
        const title = req.body.title;
        const description = req.body.description;   

        const newTodo = await Todo.create({
            title,
            description,
            userId
        })

        return res.status(201).json({
            success: true,
            message: "Todo created successfully",
            data: newTodo
        });

    } catch(error: any) {
        return res.status(500).json({
            success: false,
            message: "Failed to create Todo",
            error: error.message
        });
    }
}