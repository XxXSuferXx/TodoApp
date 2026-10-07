import type { ROLES } from "../utils/Roles";

export type Role = typeof ROLES[keyof typeof ROLES];

export interface User {
    id: string;
    username: string;
    role: Role;
}

export interface LoginResponse {
    user: User;
    token: string;
}

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface AdminUser {
    _id: string;
    username: string;
    role: Role;
}