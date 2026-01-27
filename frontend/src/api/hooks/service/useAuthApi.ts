import { useAuth } from '../../../auth/useAuth';
import useApiClient from '../useApiClient';
import type { LoginDto, LoginResponse } from '../../interfaces/auth-interfaces';

export default function useAuthApi() {
  const apiClient = useApiClient();
  const { setToken, setUser } = useAuth();

  return {
    login: (data: LoginDto): Promise<LoginResponse> =>
      apiClient.post<LoginResponse>('/auth/login', data).then((r) => {
        setToken(r.data.data.token);
        setUser(r.data.data.user);
        return r.data;
      }),

    me: (): Promise<LoginResponse> =>
      apiClient.get<LoginResponse>('/auth/me').then((r) => r.data),
  };
}
