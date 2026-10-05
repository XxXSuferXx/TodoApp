import { Schema, model } from "mongoose";

export type Role = "user" | "admin";

export interface IUser {
    username: string, 
    password: string,
    role: Role;
}

const userSchema = new Schema<IUser>({ 
    username: { type: String, trim: true, required: true, unique: true },
    password: { type: String, required: true, select: false},
    role: { type: String, enum: ["user", "admin"], default: "user" },
});

export const User = model<IUser>('User', userSchema);