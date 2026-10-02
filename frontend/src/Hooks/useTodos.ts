import { useEffect, useState } from "react";
import type { ApiResponse, Todo } from "../Types/todo";

const API = "http://localhost:3000/api/v1";

function useTodos(userId: string) {

    const [todos, setTodos] = useState<Todo[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(()=> {
        const controller = new AbortController();
        async function loadTodos() {
            try {
            setLoading(true);
            setError(null);

            const res = await fetch(`${API}/todos/${userId}`, {
                signal: controller.signal
            })
            const body = await res.json();

            if(!res.ok) {
                throw new Error(body.message?? `Server responded with ${res.status}`)
            }
           
            setTodos(body.data);
            } catch(err) {
                if (err instanceof DOMException && err.name === "AbortError") return;
                setError(err instanceof Error ? err.message : "Something went wrong")
            } finally {
                if (!controller.signal.aborted) setLoading(false);
            }
        }
        
        loadTodos();
        return () => controller.abort();
    },[userId]);

    async function deleteTodo(id: string) {
    try {
        const res = await fetch(`${API}/todos/${userId}/${id}`, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ userId }),
        });
        const body: ApiResponse<Todo> = await res.json();

        if (!res.ok) {
            throw new Error(body.message ?? `Server responded with ${res.status}`);
        }

        setTodos(todos.filter((todo) => todo._id !== id)); // only after success
    } catch (err) {
        // show the failure somewhere
    }
}

    return { todos, setTodos, loading, error, deleteTodo };
}

export default useTodos;