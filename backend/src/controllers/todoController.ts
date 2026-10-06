import { type Request, type Response } from "express";
import { Todo } from "../modals/todoSchema.js";
import mongoose, { Types } from "mongoose";

export const addTodo = async (req: Request, res: Response)=> {
    try{
        const { title, description } = req.body;

        if (typeof title !== "string" || !title.trim()) {
            return res.status(400).json({ success: false, message: "Title is required" });
        }

        const newTodo = await Todo.create({
            title: title.trimEnd(),
            description,
            userId: req.user!.userId
        })

        return res.status(201).json({
            success: true,
            message: "Todo created successfully",
            data: newTodo
        });

    } catch (error: any) {
        if (error instanceof mongoose.Error.ValidationError) {
            return res.status(400).json({ success: false, message: error.message });
        }
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}

export const getTodo = async (req: Request, res: Response) => {
    try{

        const todos = await Todo.find({ userId: req.user!.userId });

        return res.status(200).json({
            success: true,
            count: todos.length,
            data: todos
        });
    } catch (error: any) {
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        })
    }
}

export const deleteTodo = async (req: Request, res: Response) => {
    try{
        const { todoId } = req.params as {todoId: string};


        if (!Types.ObjectId.isValid(todoId)) {
            return res.status(400).json({ success: false, message: "Invalid todo id" });
        }

        const deletedTodo = await Todo.findOneAndDelete({
            _id: todoId,
            userId: req.user!.userId
        });

        if(!deletedTodo) {
            return res.status(404).json({
                success: false,
                message: "Todo not found"
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
        })
    }
}

export const toggleTodo = async (req: Request, res: Response) => {
    try {
        const {todoId} = req.params as { todoId: string };

        if (!Types.ObjectId.isValid(todoId)) {
            return res.status(400).json({ success: false, message: "Invalid id" });
        }

        const todo = await Todo.findOne({
            _id: todoId,
            userId: req.user!.userId
        })

        if(!todo) {
            return res.status(404).json({
                success: false,
                message: "Todo not found"
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
        })
    }
}
