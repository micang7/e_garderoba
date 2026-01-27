import type {
  CreateLossDto,
  CreateRentalDto,
  CreateReturnDto,
  EventListResponse,
  EventQuery,
  EventResponse,
} from '../../interfaces/event-interfaces';
import useApiClient from '../useApiClient';

export default function useEventsApi() {
  const apiClient = useApiClient();

  return {
    getAll: (query?: EventQuery): Promise<EventListResponse> =>
      apiClient
        .get<EventListResponse>('/events', { params: query })
        .then((r) => r.data),

    getById: (id: number): Promise<EventResponse> =>
      apiClient.get<EventResponse>(`/events/${id}`).then((r) => r.data),

    createRental: (data: CreateRentalDto): Promise<EventResponse> =>
      apiClient.post<EventResponse>('/events/rental', data).then((r) => r.data),

    createLoss: (data: CreateLossDto): Promise<EventResponse> =>
      apiClient.post<EventResponse>('/events/loss', data).then((r) => r.data),

    createReturn: (data: CreateReturnDto): Promise<EventResponse> =>
      apiClient.post<EventResponse>('/events/return', data).then((r) => r.data),

    delete: (id: number): Promise<void> =>
      apiClient.delete(`/events/${id}`).then(() => undefined),
  };
}
