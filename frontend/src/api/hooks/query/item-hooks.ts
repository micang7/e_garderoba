import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import useItemsApi from '../service/useItemsApi';
import type {
  ItemQuery,
  CreateItemDto,
  UpdateItemDto,
  ItemResponse,
} from '../../interfaces/item-interfaces';
import type { ValidationErrorResponse } from '../../interfaces/error-interfaces';
import { toast } from 'sonner';
import mapValidationErrors from '../../../validation/map-validation-errors';
import { useState } from 'react';

export function useItems(query: ItemQuery) {
  const itemsApi = useItemsApi();

  return useQuery({
    queryKey: ['items', query],
    queryFn: () => itemsApi.getAll(query),
  });
}

export function useItem(id: number) {
  const itemsApi = useItemsApi();

  return useQuery<ItemResponse>({
    queryKey: ['item', id],
    queryFn: () => itemsApi.getById(id),
    enabled: !!id,
  });
}

export function useCreateItem(options?: { onSuccess?: () => void }) {
  const queryClient = useQueryClient();
  const itemsApi = useItemsApi();

  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const mutation = useMutation<
    ItemResponse,
    {
      status: number;
      data: ValidationErrorResponse;
    },
    CreateItemDto
  >({
    mutationFn: (data: CreateItemDto) => itemsApi.create(data),

    onMutate: () => setFieldErrors({}),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['items'] });
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
            code: 'Kod elementu jest zajęty.',
          }));
          break;
        default:
          toast.error('Bład serwera. Spróbuj ponownie później.');
          break;
      }
    },
  });

  return {
    createItem: mutation.mutate,
    isPending: mutation.isPending,
    fieldErrors,
  };
}

export function useUpdateItem(id: number) {
  const queryClient = useQueryClient();
  const itemsApi = useItemsApi();

  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const mutation = useMutation<
    ItemResponse,
    {
      status: number;
      data: ValidationErrorResponse;
    },
    UpdateItemDto
  >({
    mutationFn: (data: UpdateItemDto) => itemsApi.update(id, data),

    onMutate: () => setFieldErrors({}),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['items'] });
      queryClient.invalidateQueries({ queryKey: ['item', id] });
      toast.success('Pomyślnie zaaktualizowano element.');
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
    updateItem: mutation.mutate,
    isPending: mutation.isPending,
    fieldErrors,
  };
}

export function useDeleteItem() {
  const queryClient = useQueryClient();
  const itemsApi = useItemsApi();

  return useMutation({
    mutationFn: (id: number) => itemsApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['items'] });
    },
  });
}
