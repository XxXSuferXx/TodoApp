// pages/TodoDetail.tsx
import { useParams, Link } from "react-router-dom";
import useTodos from "../Hooks/useTodos";
import { ROUTES } from "../routes";

const USER_ID = "6a651fb721ad29ec31a4871a";

function TodoDetail() {
  const { todoId } = useParams<{ todoId: string }>();
  const { todos, loading, error } = useTodos(USER_ID);

  if (!todoId) return <p>Missing todo id</p>;
  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  const todo = todos.find((t) => t._id === todoId);
  if (!todo) return <p>Todo not found</p>;

  return (
    <div className="flex flex-col gap-2">
      <h1 className="text-2xl">{todo.title}</h1>
      <p>{todo.description ?? "No description"}</p>
      <p>Status: {todo.done ? "Done" : "Not done"}</p>
      <Link to={ROUTES.todos} className="text-yellow-400">← Back</Link>
    </div>
  );
}

export default TodoDetail;