import { Link } from "react-router-dom";
import { ROUTES } from "../routes";

function Forbidden() {
  return (
    <div className="min-h-screen bg-slate-800 text-white flex flex-col items-center justify-center gap-4">
      <h1 className="text-5xl font-bold text-red-500">403</h1>
      <p className="text-xl">You don't have permission to view this page.</p>
      <Link to={ROUTES.todos} className="rounded bg-yellow-600 px-3 py-1 hover:bg-yellow-500">
        Back to todos
      </Link>
    </div>
  );
}

export default Forbidden;