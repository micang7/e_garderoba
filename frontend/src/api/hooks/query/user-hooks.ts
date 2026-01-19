import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query';
import type {
  UserQuery,
  CreateUserDto,
  UpdateUserDto,
} from '../../interfaces/user-interfaces';
import useUsersApi from '../service/useUsersApi';

export function useUsers(query: UserQuery) {
  const usersApi = useUsersApi();

  return useQuery({
    queryKey: ['users', query],
    queryFn: () => usersApi.getAll(query),
  });
}

export function useUser(id: number) {
  const usersApi = useUsersApi();

  return useQuery({
    queryKey: ['user', id],
    queryFn: () => usersApi.getById(id),
    enabled: !!id,
  });
}

export function useCreateUser() {
  const queryClient = useQueryClient();
  const usersApi = useUsersApi();

  return useMutation({
    mutationFn: (data: CreateUserDto) => usersApi.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
  });
}

export function useUpdateUser(id: number) {
  const queryClient = useQueryClient();
  const usersApi = useUsersApi();

  return useMutation({
    mutationFn: (data: UpdateUserDto) => usersApi.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      queryClient.invalidateQueries({ queryKey: ['user', id] });
    },
  });
}

export function useDeleteUser() {
  const queryClient = useQueryClient();
  const usersApi = useUsersApi();

  return useMutation({
    mutationFn: (id: number) => usersApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
  });
}
