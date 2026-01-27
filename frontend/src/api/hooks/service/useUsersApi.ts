import type {
  UserListResponse,
  UserResponse,
  CreateUserDto,
  UpdateUserDto,
  UserQuery,
} from '../../interfaces/user-interfaces';
import useApiClient from '../useApiClient';

export default function useUsersApi() {
  const apiClient = useApiClient();

  return {
    getAll: (query?: UserQuery): Promise<UserListResponse> =>
      apiClient
        .get<UserListResponse>('/users', { params: query })
        .then((r) => r.data),

    getById: (id: number): Promise<UserResponse> =>
      apiClient.get<UserResponse>(`/users/${id}`).then((r) => r.data),

    create: (data: CreateUserDto): Promise<UserResponse> =>
      apiClient.post<UserResponse>('/users', data).then((r) => r.data),

    update: (id: number, data: UpdateUserDto): Promise<UserResponse> =>
      apiClient.patch<UserResponse>(`/users/${id}`, data).then((r) => r.data),

    delete: (id: number): Promise<void> =>
      apiClient.delete(`/users/${id}`).then(() => undefined),
  };
}
