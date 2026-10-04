// pages/TodoDetail.tsx
import { useParams, Link } from "react-router-dom";
import { ROUTES } from "../routes";

function TodoDetail() {
  const { todoId } = useParams<{ todoId: string }>();
  // todoId is `string | undefined`. URL params are always strings,
  // and TypeScript can't prove the route matched, so handle undefined.
  if (!todoId) return <p>Missing todo id</p>;

  return (
    <div>
      <p>Todo: {todoId}</p>
      <Link to={ROUTES.todos}>← Back</Link>
    </div>
  );
}
export default TodoDetail;