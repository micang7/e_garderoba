import axios from 'axios';
import { authStore } from '../auth/auth-store';
import { toast } from 'sonner';

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

export default apiClient;

apiClient.interceptors.request.use(
  (config) => {
    const token = authStore.getToken();

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
        authStore.clear();
        window.location.href = '/login';
      } else if (res.status === 403) {
        toast.error('Brak uprawnień do wykonania tej akcji.');
      }
    }

    return Promise.reject(error);
  },
);
