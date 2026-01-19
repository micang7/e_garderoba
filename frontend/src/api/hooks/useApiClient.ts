import axios from 'axios';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../auth/useAuth';

export default function useApiClient() {
  const { token, clear } = useAuth();
  const navigate = useNavigate();

  const apiClient = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    headers: {
      'Content-Type': 'application/json',
    },
    withCredentials: true,
  });

  apiClient.interceptors.request.use(
    (config) => {
      if (token) config.headers.Authorization = `Bearer ${token}`;
      return config;
    },
    (error) => Promise.reject(error),
  );

  apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
      const res = error?.response;
      if (res) {
        if (res.status === 401) {
          clear();
          navigate('/login', { replace: true });
        } else if (res.status === 403) {
          toast.error('Brak uprawnień do wykonania tej akcji.');
        }
      }

      return Promise.reject(error);
    },
  );

  return apiClient;
}
