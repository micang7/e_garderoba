import apiClient from '../apiClient';
import type { components } from '../types';

type LoginDto = components['schemas']['LoginDto'];
type LoginResponse = components['schemas']['LoginResponseDto'];

export const authApi = {
  login: (data: LoginDto): Promise<LoginResponse> =>
    apiClient
      .post<LoginResponse>('/api/v1/auth/login', data)
      .then((r) => r.data),
};
