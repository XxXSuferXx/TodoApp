import mongoose, { Schema, model, Document } from "mongoose";

export interface ITodo extends Document{
    title: string;
    description?: string;
    completed: boolean;
    userId: mongoose.Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
}

const TodoSchema = new Schema <ITodo>(
{
    title: {
        type: String,
        required: [true, "Title is required"],
        trim: true,
        maxlength: [100, "Title cannot exceed 100 characters"]
    },
    description: {
            type: String,
            trim: true,
            maxlength: [500, "Description cannot exceed 500 characters"]
        },
    completed: {
        type: Boolean,
        default: false
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        }
}, 
{
    timestamps: true
});

export const Todo =  model<ITodo>('Todo', TodoSchema);
