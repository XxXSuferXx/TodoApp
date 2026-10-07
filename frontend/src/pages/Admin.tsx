import { Link } from "react-router-dom";
import { useAuth } from "../Context/authContext";
import { ROUTES } from "../routes";

function Admin() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-slate-800 text-white flex flex-col items-center justify-center gap-4">
      <h1 className="text-3xl font-bold">Admin Dashboard</h1>
      <p>Welcome, {user?.username}</p>
      <Link to={ROUTES.todos} className="rounded bg-slate-600 px-3 py-1 hover:bg-slate-500">
        Back to todos
      </Link>
    </div>
  );
}

export default Admin;