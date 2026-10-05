import { NavLink, Outlet } from "react-router-dom";
import { ROUTES } from "../routes";
import { useAuth } from "../Context/authContext";


function Layout() {

    const { isAuthenticated, user } = useAuth();

    const linkClass = ({isActive}: {isActive : boolean}) => {  
        return isActive? " text-yellow-400": "text-white";
    }

    return (
        <div className = " bg-slate-700 min-h-screen">
            <nav className = " bg-slate-700 flex gap-4 p-4 border-b border-slate-500">
                <NavLink to={ROUTES.home} className={linkClass}> Home </NavLink>
                <NavLink to={ROUTES.todos} className={linkClass}> Todos</NavLink>
                <NavLink to={ROUTES.admin} className={linkClass}>Admin</NavLink>
                {isAuthenticated ? (
                    <span className="text-white">Logged in as {user?.username}</span>
                ) : (
                    <NavLink to={ROUTES.login} className={linkClass}>Login</NavLink>
                )}
            </nav>
            <main className=" p-4 bg-black text-white">
                <Outlet />
            </main>
        </div>
    )

}

export default Layout;