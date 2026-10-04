import { Link } from "react-router-dom";
import { ROUTES } from "../routes";


function NotFound() {

    return (
        <div className = " bg-slate-800 min-h-screen text-white">
            <h1>Page Not Found</h1>
            <Link to={ROUTES.home}>Go Home</Link>
        </div>
    )

}

export default NotFound;