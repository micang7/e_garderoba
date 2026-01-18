import apiClient from '../apiClient';
import type { components } from '../types';
import type { LoginDto, LoginResponse } from '../interfaces/auth-interfaces';

export const authApi = {
  login: (data: LoginDto): Promise<LoginResponse> =>
    apiClient
      .post<LoginResponse>('/api/v1/auth/login', data)
      .then((r) => r.data),
};
