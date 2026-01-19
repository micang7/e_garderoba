import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import useItemsApi from '../service/useItemsApi';
import type {
  ItemQuery,
  CreateItemDto,
  UpdateItemDto,
} from '../../interfaces/item-interfaces';

export function useItems(query: ItemQuery) {
  const itemsApi = useItemsApi();

  return useQuery({
    queryKey: ['items', query],
    queryFn: () => itemsApi.getAll(query),
  });
}

export function useItem(id: number) {
  const itemsApi = useItemsApi();

  return useQuery({
    queryKey: ['item', id],
    queryFn: () => itemsApi.getById(id),
    enabled: !!id,
  });
}

export function useCreateItem() {
  const queryClient = useQueryClient();
  const itemsApi = useItemsApi();

  return useMutation({
    mutationFn: (data: CreateItemDto) => itemsApi.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['items'] });
    },
  });
}

export function useUpdateItem(id: number) {
  const queryClient = useQueryClient();
  const itemsApi = useItemsApi();

  return useMutation({
    mutationFn: (data: UpdateItemDto) => itemsApi.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['items'] });
      queryClient.invalidateQueries({ queryKey: ['item', id] });
    },
  });
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
