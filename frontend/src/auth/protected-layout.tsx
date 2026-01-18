import { Navigate, Outlet } from 'react-router-dom';
import { authStore } from './auth-store';

export const ProtectedLayout = () => {
  const token = authStore.getToken();

  if (!token) return <Navigate to="/login" />;

  return <Outlet />;
};
