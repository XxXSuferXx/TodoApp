import { useState } from "react";
import TodoForm from "../components/todos/TodoForm";

export function HomePage() {
    const [todos, setTodos] = useState<string[]>([]);
    
    /** INCREASE SIZE: Append new items using spread syntax [...] 
     * const prev = ["Buy milk", "Walk dog"];
     * const newArray = [...prev, "Learn React"];
     * Result: ["Buy milk", "Walk dog", "Learn React"]
     */
    const handleAdd = (text: string) => {
        setTodos((prev) => [...prev, text]);
    };

    // DECREASE SIZE: Remove item using .filter()
    const handleDelete = (indexToDelete: number) => {
        setTodos((prevTodos) => 
            prevTodos.filter((item, currentIndex) => currentIndex !== indexToDelete)
        );
    };
    
    return (        
        <div className = "bg-black min-h-screen">
            <TodoForm onAdd ={handleAdd} />
            <div className = "text-white">
                {todos.map((item, index) => (
            <div 
                key={index} 
                className="flex justify-between items-center bg-gray-900 border border-gray-800 p-3 rounded"
            >
                <span>{item}</span>
                <button
                onClick={() => handleDelete(index)}
                className="px-2 py-1 bg-red-600 hover:bg-red-500 rounded text-xs font-semibold"
                >
                Delete
                </button>
            </div>
            ))}       
            </div>
        </div>
    )
}