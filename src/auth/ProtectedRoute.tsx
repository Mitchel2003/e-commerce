import { useAuthContext } from "@/context/AuthContext"
import { Navigate, Outlet } from "react-router-dom";

function ProtectedRoute() {
  const { isAuth, loading } = useAuthContext();
  if (loading) return (<h1> loading authentication... </h1>)
  if (!loading && !isAuth) return (<Navigate to='/auth/login' replace />);
  return <Outlet />
}

export default ProtectedRoute