import axios from 'axios';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../auth/useAuth';

export default function useApiClient() {
  const { token, clear } = useAuth();
  const navigate = useNavigate();

  const apiClient = axios.create({
    baseURL: '/api/v1',
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
      if (!error.response) {
        toast.error('Brak połączenia z serwerem.');
        return Promise.reject({
          status: 500,
          data: { error: 'Brak połączenia z serwerem.' },
        });
      }

      const { status, data } = error.response;
      switch (status) {
        case 401:
          if (data.error !== 'Unauthorized') break;
          clear();
          navigate('/login', { replace: true });
          toast.error('Sesja wygasła. Zaloguj się ponownie.');
          break;
        case 403:
          toast.error('Brak uprawnień do wykonania tej akcji.');
          break;
        case 404:
          toast.error('Nie znaleziono zasobu.');
          break;
        case 500:
          toast.error('Błąd serwera. Spróbuj ponownie później.');
          break;
      }
      return Promise.reject({ status, data });
    },
  );

  return apiClient;
}
