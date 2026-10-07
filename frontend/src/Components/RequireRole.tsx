
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../Context/authContext";
import { ROUTES } from "../routes";
import type { Role } from "../Types/Auth";

interface Props {
  allowedRoles: Role[];
}

export default function RequireRole({ allowedRoles }: Props) {
  const { user } = useAuth();

  if (!user || !allowedRoles.includes(user.role)) {
    return <Navigate to={ROUTES.forbidden} replace />;
  }

  return <Outlet />;
}