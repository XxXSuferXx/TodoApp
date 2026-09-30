

export interface Todo {
    _id: string;
    title: string;
    description?: string;
    userId: string;
    done?: boolean;
}

export interface getTodoResponse {
    success: boolean;
    count: number;
    data: Todo[];
}