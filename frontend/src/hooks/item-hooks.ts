import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { itemsApi } from '../api/services/itemsApi';
import type {
  ItemQuery,
  CreateItemDto,
  UpdateItemDto,
} from '../api/interfaces/item-interfaces';

export const useItems = (query: ItemQuery) => {
  return useQuery({
    queryKey: ['items', query],
    queryFn: () => itemsApi.getAll(query),
  });
};

export const useItem = (id: number) => {
  return useQuery({
    queryKey: ['item', id],
    queryFn: () => itemsApi.getById(id),
    enabled: !!id,
  });
};

export const useCreateItem = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateItemDto) => itemsApi.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['items'] });
    },
  });
};

export const useUpdateItem = (id: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: UpdateItemDto) => itemsApi.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['items'] });
      queryClient.invalidateQueries({ queryKey: ['item', id] });
    },
  });
};

export const useDeleteItem = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => itemsApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['items'] });
    },
  });
};
