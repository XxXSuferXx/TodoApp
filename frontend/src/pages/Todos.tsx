import { useState } from "react";
import useInput from "../Hooks/useInput";
import type { Todo } from "../Types/todo";
import useTodos from "../Hooks/useTodos";
import { Link } from "react-router-dom";
import { todoDetailPath } from "../routes";

const USER_ID = '6a651fb721ad29ec31a4871a';

function Todos() {
    const { todos, loading, error: loadError, deleteTodo: removeTodo, addTodo: createTodo, completed } = useTodos(USER_ID);

    const todoInput = useInput("");
    const [error, setError] = useState("");
    
    async function addTodo() {
        const trimmed = todoInput.value.trim();
        if (trimmed === "") {
            setError("Todo can't be empty");
            return;
        }

        const isDuplicate = todos.some(
            (todo) => todo.title.toLowerCase() === trimmed.toLowerCase()
        );

        if (isDuplicate) {
            setError(`${trimmed} is already on the list`);
            return;
        }

        const newTodo: Todo = {
            _id: crypto.randomUUID(),
            userId: USER_ID,
            title: trimmed,
            done: false,
        };
        try {
            await createTodo(newTodo);

            todoInput.reset();
            setError("");
        } catch (err) {
            setError(err instanceof Error? err.message: "Something went wrong");
        }
        
    }

    function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
        todoInput.onChange(e);
        if (error) setError("");
    }

    async function deleteTodo(id: string) {
         try {
            setError("");
            await removeTodo(id);
        } catch (err) {
            setError(err instanceof Error ? err.message : "Something went wrong");
        }
    }

    async function toggleTodo(id: string) {
        try {
            setError("");
            await completed(id);
        } catch (err) {
            setError(err instanceof Error ? err.message : "Something went wrong");
        }
    }

    function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
        if (e.key === "Enter") {
            addTodo();
        }
    }

    if (loading) return <p className="text-white">Loading...</p>;
    if (loadError) return <p className="text-red-500">{loadError}</p>;

    return (
        <div className=" bg-slate-800 text-white flex justify-center gap-4 py-50">
            <div className=" flex flex-col gap-4">
                <div className=" flex gap-4">
                    <input
                        value={todoInput.value}
                        onChange={handleInputChange}
                        onKeyDown={handleKeyDown}
                        type="text"
                        placeholder="Type todo here"
                    />
                    <button onClick={addTodo} className=" rounded bg-yellow-600">
                        Add Todo
                    </button>
                </div>
                <div className=" text-red-500">
                    <span>{error}</span>
                </div>
                <ul className=" space-y-2">
                    {todos.map((todo) => (
                        <li key={todo._id} className=" flex gap-2 items-center">
                            <Link
                                to={todoDetailPath(todo._id)}
                                className={todo.done ? "line-through text-yellow-400" : "hover:underline"}
                            >
                                {todo.title}
                            </Link>
                            <input
                                type="checkbox"
                                checked={todo.done}
                                onChange={() => toggleTodo(todo._id)}
                            />
                            <button
                                onClick={() => deleteTodo(todo._id)}
                                className=" rounded bg-red-600"
                            >
                                Delete
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default Todos;