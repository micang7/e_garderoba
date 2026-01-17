import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query';
import { usersApi } from '../api/services/usersApi';
import type { components, operations } from '../api/types';

type UserQuery = operations['UserController_findAll']['parameters']['query'];
type CreateUserDto = components['schemas']['CreateUserDto'];
type UpdateUserDto = components['schemas']['UpdateUserDto'];

export const useUsers = (query: UserQuery) => {
  return useQuery({
    queryKey: ['users', query],
    queryFn: () => usersApi.getAll(query),
  });
};

export const useUser = (id: number) => {
  return useQuery({
    queryKey: ['user', id],
    queryFn: () => usersApi.getById(id),
    enabled: !!id,
  });
};

export const useCreateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateUserDto) => usersApi.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
  });
};

export const useUpdateUser = (id: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: UpdateUserDto) => usersApi.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      queryClient.invalidateQueries({ queryKey: ['user', id] });
    },
  });
};

export const useDeleteUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => usersApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
  });
};
