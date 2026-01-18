import type { components, operations } from '../types';

type ItemListResponse = components['schemas']['ItemListResponseDto'];
type ItemResponse = components['schemas']['ItemResponseDto'];
type CreateItemDto = components['schemas']['CreateItemDto'];
type UpdateItemDto = components['schemas']['UpdateItemDto'];
type Item = components['schemas']['ItemDto'];
type ItemQuery = operations['ItemController_findAll']['parameters']['query'];

export type {
  ItemListResponse,
  ItemResponse,
  CreateItemDto,
  UpdateItemDto,
  Item,
  ItemQuery,
};
