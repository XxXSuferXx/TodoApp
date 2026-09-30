import { useState } from "react";
import useInput from "../Hooks/useInput";
import type { Todo } from "../Types/todo";

const USER_ID = "a";

function TodoList() {
    const [todos, setTodos] = useState<Todo[]>([
        { _id: "aa", userId: "a", title: "first", done: false },
        { _id: "bb", userId: "b", title: "second", done: false },
        { _id: "cc", userId: "c", title: "third", done: false },
    ]);

    const todoInput = useInput("");
    const [error, setError] = useState("");

    function addTodo() {
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

        setTodos([...todos, newTodo]);
        todoInput.reset();
        setError("");
    }

    function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
        todoInput.onChange(e);
        if (error) setError("");
    }

    function toggleTodo(id: string) {
        setTodos(
            todos.map((todo) =>
                todo._id === id ? { ...todo, done: !todo.done } : todo
            )
        );
    }

    function deleteTodo(id: string) {
        setTodos(todos.filter((todo) => todo._id !== id));
    }

    function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
        if (e.key === "Enter") {
            addTodo();
        }
    }

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
                            <span className={todo.done ? "line-through text-yellow-400" : ""}>
                                {todo.title}
                            </span>
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

export default TodoList;