import type {
  ItemListResponse,
  ItemResponse,
  CreateItemDto,
  UpdateItemDto,
  ItemQuery,
} from '../../interfaces/item-interfaces';
import useApiClient from '../useApiClient';

export default function useItemsApi() {
  const apiClient = useApiClient();

  return {
    getAll: (query?: ItemQuery): Promise<ItemListResponse> =>
      apiClient
        .get<ItemListResponse>('/items', { params: query })
        .then((r) => r.data),

    getById: (id: number): Promise<ItemResponse> =>
      apiClient.get<ItemResponse>(`/items/${id}`).then((r) => r.data),

    create: (data: CreateItemDto): Promise<ItemResponse> =>
      apiClient.post<ItemResponse>('/items', data).then((r) => r.data),

    update: (id: number, data: UpdateItemDto): Promise<ItemResponse> =>
      apiClient.patch<ItemResponse>(`/items/${id}`, data).then((r) => r.data),

    delete: (id: number): Promise<void> =>
      apiClient.delete(`/items/${id}`).then(() => undefined),
  };
}
