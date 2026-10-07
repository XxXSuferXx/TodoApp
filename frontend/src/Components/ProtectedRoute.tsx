import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../Context/authContext";
import { ROUTES } from "../routes";

export default function ProtectedRoute() {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    //remember where they were trying to go so Login can send them back
    return <Navigate to={ROUTES.login} replace state={{ from: location }} />;
  }
  //renders whichever child route matched
  return <Outlet />;
}