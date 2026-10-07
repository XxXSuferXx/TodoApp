import { useEffect, useState } from "react";
import type { NewTodoInput, Todo } from "../Types/todo";
import useApi from "./useApi";

function useTodos() {
    const api = useApi();
    const [todos, setTodos] = useState<Todo[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(()=> {
        const controller = new AbortController();
        (async () => {
            try {
                setLoading(true);
                setError(null);
                const body = await api<Todo[]>("/todos", { signal: controller.signal });
                setTodos(body.data as Todo[]);
            } catch (err) {
                if (err instanceof DOMException && err.name === "AbortError") return;
                setError(err instanceof Error ? err.message : "Something went wrong");
            } finally {
                if (!controller.signal.aborted) setLoading(false);
            }
        })();
    return () => controller.abort();
}, [api]);

    async function deleteTodo(id: string) {
        await api<Todo>(`/todos/${id}`, { method: "DELETE" });
        setTodos((prev) => prev.filter((t) => t._id !== id));
  }

    async function addTodo({ title, description }: NewTodoInput) {
        const body = await api<Todo>(`/todos`, {
            method: "POST",
            body: JSON.stringify({ title, description })
            });
        setTodos((prev)=> [...prev, body.data])    
    }

    async function completed(id: string) {
        const body = await api<Todo>(`/todos/${id}`, {method: "PATCH"});
       
        const updated = body.data;
        if (!updated) throw new Error("Server returned no todo");
        setTodos((prev) => prev.map((t) => (t._id === id ? updated : t)));

        }

    return { todos, loading, error, deleteTodo, addTodo, completed };
}

export default useTodos;