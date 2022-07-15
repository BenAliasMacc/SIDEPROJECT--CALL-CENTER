import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const RequireAuth = ({ allowedRoles }) => {
    const userRole = localStorage.getItem("userRole");
    const { auth } = useAuth();
    const location = useLocation();
    console.log(typeof(allowedRoles[0]));
    console.log(typeof(userRole));

    return (
        allowedRoles?.includes(userRole)
            ? <Outlet />
            : auth?.user
                ? <Navigate to="/unauthorized" state={{ from: location }} replace />
                : <Navigate to="/" state={{ from: location }} replace />
    );
}

export default RequireAuth;