

export interface Todo {
    _id: string;
    title: string;
    description?: string;
    done: boolean;
    userId: string;
}

export interface TodoResponse {
    success: boolean;
    count: number;
    data: Todo[];
}

export type ApiResponse<T> = {
    success: boolean;
    message: string;
    data: T;
};

export type NewTodoInput = {
    title:string;
    description?: string;
}