import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../Context/authContext";
import useApi from "../Hooks/useApi";
import { ROUTES } from "../routes";
import type { AdminUser } from "../Types/Auth";

function Admin() {
  const { user } = useAuth();
  const api = useApi();
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    (async () => {
      try {
        setLoading(true);
        setError(null);
        const body = await api<AdminUser[]>("/admin/users", { signal: controller.signal });
        setUsers(body.data ?? []);
      } catch (err) {
        if (err instanceof DOMException && err.name === "AbortError") return;
        setError(err instanceof Error ? err.message : "Something went wrong");
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    })();
    return () => controller.abort();
  }, [api]);

  return (
    <div className=" min-h-screen bg-slate-800 text-white flex flex-col items-center justify-center gap-4">
      <h1 className=" text-3xl font-bold">Admin Dashboard</h1>
      <p>Welcome, {user?.username}</p>

      {loading && <p>Loading users...</p>}
      {error && <p className=" text-red-500">{error}</p>}

      <ul className="space-y-1">
        {users.map((u) => (
          <li key={u._id}>
            {u.username} <span className=" text-yellow-400">({u.role})</span>
          </li>
        ))}
      </ul>

      <Link to={ROUTES.todos} className=" rounded bg-slate-600 px-3 py-1 hover:bg-slate-500">
        Back to todos
      </Link>
    </div>
  );
}

export default Admin;