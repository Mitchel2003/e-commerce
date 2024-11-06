import { Navigate, Outlet } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext"

function ProtectedRoute() {
  const { isAuth, loading } = useAuthContext();
  if (loading) return (<h1> loading authentication... </h1>)
  if (!loading && !isAuth) return (<Navigate to='/login' replace />);
  return <Outlet />
}

export default ProtectedRoute