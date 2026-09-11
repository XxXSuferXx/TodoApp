interface TodoItemProps {
    label: string;
}

export function TodoItem ({label}: TodoItemProps) {
    return (
    <div className="p-3 bg-slate-800 rounded-md border border-slate-700 text-slate-100">
      {label}
    </div>
  );
}