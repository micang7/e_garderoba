import apiClient from '../apiClient';
import { authStore } from '../../auth/auth-store';
import type { LoginDto, LoginResponse } from '../interfaces/auth-interfaces';

export const authApi = {
  login: (data: LoginDto): Promise<LoginResponse> =>
    apiClient.post<LoginResponse>('/api/v1/auth/login', data).then((r) => {
      authStore.setToken(r.data.data.token);
      authStore.setUser(r.data.data.user);
      return r.data;
    }),

  me: (): Promise<LoginResponse> =>
    apiClient.get<LoginResponse>('/api/v1/auth/me').then((r) => r.data),
};
