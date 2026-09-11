import { Trash2, Check } from "lucide-react";
import { Todo } from "../../Types/types";


interface TodoItemProps {
  todo: Todo;
  onToggle: (todo: Todo) => void | Promise<void>;
  onDelete: (id: string) => void | Promise<void>;
}

// Renders one todo row. All the actual logic (calling the API, updating
// state) lives in TodosPage — this component just displays data and
// calls the callbacks it's given.
export default function TodoItem({ todo, onToggle, onDelete }: TodoItemProps) {
  return (
    <div className="flex items-center gap-3 px-4 py-3 group">
      <button
        onClick={() => onToggle(todo)}
        className={`w-5 h-5 shrink-0 rounded-full border flex items-center justify-center transition-colors ${
          todo.completed
            ? "bg-slate-900 border-slate-900"
            : "border-slate-300 hover:border-slate-500"
        }`}
        aria-label={todo.completed ? "Mark as not done" : "Mark as done"}
      >
        {todo.completed && <Check size={12} className="text-white" />}
      </button>

      <span
        className={`flex-1 text-sm ${
          todo.completed ? "text-slate-400 line-through" : "text-slate-700"
        }`}
      >
        {todo.text}
      </span>

      <button
        onClick={() => onDelete(todo._id)}
        className="text-slate-300 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
        aria-label="Delete todo"
      >
        <Trash2 size={16} />
      </button>
    </div>
  );
}