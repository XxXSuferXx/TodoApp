import { type Request, type Response } from "express";
import { Todo } from "../modals/todoSchema.js";
import { Types } from "mongoose";

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

export const getTodo = async (req: Request, res: Response) => {
    try{
        const { userId } = req.params;

        if(!userId) {
            return res.status(400).json({
                success: false,
                message: "UserId is required and must be a valid string"
            })
        }

        const todos = await Todo.find({ userId });

        return res.status(200).json({
            success: true,
            count: todos.length,
            data: todos
        });
    } catch (error: any) {
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message
        })
    }
}

export const deleteTodo = async (req: Request, res: Response) => {
    try{
        const { todoId } = req.params;
        const userId = req.body.userId;

        const deletedTodo = await Todo.findOneAndDelete({
            _id: new Types.ObjectId(todoId as string),
            userId: userId
        });

        if(!deletedTodo) {
            return res.status(404).json({
                success: false,
                message: "Todo not found or unauthorized"
            })
        }
        return res.status(200).json({
            success: true,
            message: "Todo deleted successfully",
            data: deleteTodo
        })

    } catch(error: any) {
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message
        })
    }
}
