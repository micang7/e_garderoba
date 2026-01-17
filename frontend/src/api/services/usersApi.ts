import apiClient from '../apiClient';
import type { components, operations } from '../types';

type UserListResponse = components['schemas']['UserListResponseDto'];
type UserResponse = components['schemas']['UserResponseDto'];
type CreateUserDto = components['schemas']['CreateUserDto'];
type UpdateUserDto = components['schemas']['UpdateUserDto'];
type UserQuery = operations['UserController_findAll']['parameters']['query'];

export const usersApi = {
  getAll: (query?: UserQuery): Promise<UserListResponse> =>
    apiClient
      .get<UserListResponse>('/api/v1/users', { params: query })
      .then((r) => r.data),

  getById: (id: number): Promise<UserResponse> =>
    apiClient.get<UserResponse>(`/api/v1/users/${id}`).then((r) => r.data),

  create: (data: CreateUserDto): Promise<UserResponse> =>
    apiClient.post<UserResponse>('/api/v1/users', data).then((r) => r.data),

  update: (id: number, data: UpdateUserDto): Promise<UserResponse> =>
    apiClient
      .patch<UserResponse>(`/api/v1/users/${id}`, data)
      .then((r) => r.data),

  delete: (id: number): Promise<void> =>
    apiClient.delete(`/api/v1/users/${id}`).then(() => undefined),
};
