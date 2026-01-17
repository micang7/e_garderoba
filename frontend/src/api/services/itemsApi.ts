import apiClient from '../apiClient';
import type { components, operations } from '../types';

type ItemListResponse = components['schemas']['ItemListResponseDto'];
type ItemResponse = components['schemas']['ItemResponseDto'];
type CreateItemDto = components['schemas']['CreateItemDto'];
type UpdateItemDto = components['schemas']['UpdateItemDto'];
type ItemQuery = operations['ItemController_findAll']['parameters']['query'];

export const itemsApi = {
  getAll: (query?: ItemQuery): Promise<ItemListResponse> =>
    apiClient
      .get<ItemListResponse>('/api/v1/items', { params: query })
      .then((r) => r.data),

  getById: (id: number): Promise<ItemResponse> =>
    apiClient.get<ItemResponse>(`/api/v1/items/${id}`).then((r) => r.data),

  create: (data: CreateItemDto): Promise<ItemResponse> =>
    apiClient.post<ItemResponse>('/api/v1/items', data).then((r) => r.data),

  update: (id: number, data: UpdateItemDto): Promise<ItemResponse> =>
    apiClient
      .patch<ItemResponse>(`/api/v1/items/${id}`, data)
      .then((r) => r.data),

  delete: (id: number): Promise<void> =>
    apiClient.delete(`/api/v1/items/${id}`).then(() => undefined),
};
