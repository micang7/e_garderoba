import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from './useAuth';

export default function ProtectedLayout() {
  const { isAuth } = useAuth();

  if (!isAuth) return <Navigate to="/login" replace />;

  return <Outlet />;
}
