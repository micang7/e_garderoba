import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query';
import type {
  UserQuery,
  CreateUserDto,
  UpdateUserDto,
  UserResponse,
} from '../../interfaces/user-interfaces';
import useUsersApi from '../service/useUsersApi';
import { useState } from 'react';
import { toast } from 'sonner';
import mapValidationErrors from '../../../validation/map-validation-errors';
import type { ValidationErrorResponse } from '../../interfaces/error-interfaces';

export function useUsers(query: UserQuery) {
  const usersApi = useUsersApi();

  return useQuery({
    queryKey: ['users', query],
    queryFn: () => usersApi.getAll(query),
  });
}

export function useUser(id: number) {
  const usersApi = useUsersApi();

  return useQuery<UserResponse>({
    queryKey: ['user', id],
    queryFn: () => usersApi.getById(id),
    enabled: !!id,
  });
}

export function useCreateUser(options?: { onSuccess?: () => void }) {
  const queryClient = useQueryClient();
  const usersApi = useUsersApi();

  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const mutation = useMutation<
    UserResponse,
    {
      status: number;
      data: ValidationErrorResponse;
    },
    CreateUserDto
  >({
    mutationFn: (data: CreateUserDto) => usersApi.create(data),

    onMutate: () => setFieldErrors({}),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      toast.success('Pomyślnie utworzono użytkownika.');
      options?.onSuccess?.();
    },

    onError: (error) => {
      const { status, data } = error;

      switch (status) {
        case 400:
          setFieldErrors((prev) => ({
            ...prev,
            ...mapValidationErrors(data.validationErrors),
          }));
          break;
        case 409:
          setFieldErrors((prev) => ({
            ...prev,
            email: 'Email jest zajęty.',
          }));
          break;
        default:
          toast.error('Bład serwera. Spróbuj ponownie później.');
          break;
      }
    },
  });

  return {
    createUser: mutation.mutate,
    isPending: mutation.isPending,
    fieldErrors,
  };
}

export function useUpdateUser(id: number) {
  const queryClient = useQueryClient();
  const usersApi = useUsersApi();

  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const mutation = useMutation<
    UserResponse,
    {
      status: number;
      data: ValidationErrorResponse;
    },
    UpdateUserDto
  >({
    mutationFn: (data: UpdateUserDto) => usersApi.update(id, data),

    onMutate: () => setFieldErrors({}),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      queryClient.invalidateQueries({ queryKey: ['user', id] });
      toast.success('Pomyślnie zaaktualizowano użytkownika.');
    },

    onError: (error) => {
      const { status, data } = error;

      switch (status) {
        case 400:
          setFieldErrors((prev) => ({
            ...prev,
            ...mapValidationErrors(data.validationErrors),
          }));
          break;
        case 409:
          setFieldErrors((prev) => ({
            ...prev,
            email: 'Email jest zajęty.',
          }));
          break;
        default:
          toast.error('Bład serwera. Spróbuj ponownie później.');
          break;
      }
    },
  });

  return {
    updateUser: mutation.mutate,
    isPending: mutation.isPending,
    fieldErrors,
  };
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
