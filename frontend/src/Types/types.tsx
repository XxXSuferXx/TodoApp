// Shared shapes used across the app. Keeping these in one place means
// components, hooks, and the API client all agree on what a User or
// Todo looks like.

export interface User {
  id: string;
  name: string;
  email: string;
}

export interface Todo {
  _id: string;
  text: string;
  completed: boolean;
  user?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface AuthContextValue {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}