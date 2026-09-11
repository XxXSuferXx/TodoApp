import React, { useState, FormEvent } from "react";

interface TodoFormProps {
  onAdd: (text: string) => void | Promise<void>;
}

// A small, focused component: it only knows how to collect text and
// hand it off via onAdd. It doesn't know anything about the API or state.
export default function TodoForm({ onAdd }: TodoFormProps) {
  const [text, setText] = useState("");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const trimmed = text.trim();
    if (!trimmed) return;
    onAdd(trimmed);
    setText("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 mb-6">
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="What needs to be done?"
        className="flex-1 px-3 py-2 text-sm rounded-md border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-slate-400"
      />
      <button
        type="submit"
        className="px-4 py-2 text-sm font-medium rounded-md bg-slate-900 text-white hover:bg-slate-800 transition-colors"
      >
        Add
      </button>
    </form>
  );
}