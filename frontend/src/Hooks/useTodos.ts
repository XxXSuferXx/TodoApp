import { useEffect, useState } from "react";
import type { Todo, TodoResponse } from "../Types/todo";


const API = "http://localhost:3000/api";

export function useTodos(userId: string) {
    const [todos, setTodos] = useState<Todo[]>();
    const [loading, setLoading] = useState(true);
    const [fetchError, setFetchError] = useState("");

    useEffect(()=> {
        const controller = new AbortController();

        async function loadTodos() {
            setLoading(true);
            setFetchError("");
            try {
                const res = await fetch(`${API}/todos/${userId}`, {
                    signal: controller.signal
                });

                const body = await res.json();

                if(!res.ok) {
                    throw new Error(body.message?? `Server responded with ${res.status}`);
                }

                setTodos((body as TodoResponse).data);
            } catch (err) {
                
                if (err instanceof DOMException && err.name === "AbortError") return;
                setFetchError(err instanceof Error ? err.message : "Something went wrong");
            } finally {
                if (!controller.signal.aborted) setLoading(false);
            }
        }

        loadTodos();

        return () => controller.abort();
    }, [userId]);
}