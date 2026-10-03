import { type Request, type Response } from "express";
import { Todo } from "../modals/todoSchema.js";
import mongoose, { Types } from "mongoose";

export const addTodo = async (req: Request, res: Response)=> {
    try{
        const {userId, title, description} = req.body;

        if (!Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ success: false, message: "Valid userId is required" });
        }
        if (typeof title !== "string" || !title.trim()) {
            return res.status(400).json({ success: false, message: "Title is required" });
        }

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
        if (error instanceof mongoose.Error.ValidationError) {
            return res.status(400).json({ success: false, message: error.message });
        }
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
            data: deletedTodo
        })

    } catch(error: any) {
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message
        })
    }
}

export const toggleTodo = async (req: Request, res: Response) => {
    try {
        const {userId, todoId} = req.params as { userId: string; todoId: string };

        if (!Types.ObjectId.isValid(userId) || !Types.ObjectId.isValid(todoId)) {
            return res.status(400).json({ success: false, message: "Invalid id" });
        }

        const todo = await Todo.findOne({
            _id: todoId,
            userId
        })

        if(!todo) {
            return res.status(404).json({
                success: false,
                message: "Todo not found or unauthorized"
            })
        }

        todo.done = !todo.done;
        await todo.save();

        return res.status(200).json({
            success: true,
            message: "Todo updated successfully",
            data: todo,
        });

    } catch(err: any) {
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: err.message
        })
    }
}
