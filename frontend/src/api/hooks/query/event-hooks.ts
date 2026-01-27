import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import type {
  CreateLossDto,
  CreateRentalDto,
  CreateReturnDto,
  EventQuery,
  EventResponse,
} from '../../interfaces/event-interfaces';
import useEventsApi from '../service/useEventsApi';
import { useState } from 'react';
import type { ValidationErrorResponse } from '../../interfaces/error-interfaces';
import { toast } from 'sonner';
import mapValidationErrors from '../../../validation/map-validation-errors';

export function useEvents(query: EventQuery) {
  const eventsApi = useEventsApi();

  return useQuery({
    queryKey: ['events', query],
    queryFn: () => eventsApi.getAll(query),
  });
}

export function useEvent(id: number) {
  const eventsApi = useEventsApi();

  return useQuery<EventResponse>({
    queryKey: ['event', id],
    queryFn: () => eventsApi.getById(id),
    enabled: !!id,
  });
}

export function useCreateRental(options?: { onSuccess?: () => void }) {
  const queryClient = useQueryClient();
  const eventsApi = useEventsApi();

  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const mutation = useMutation<
    EventResponse,
    {
      status: number;
      data: ValidationErrorResponse;
    },
    CreateRentalDto
  >({
    mutationFn: (data: CreateRentalDto) => eventsApi.createRental(data),

    onMutate: () => setFieldErrors({}),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['events'] });
      toast.success('Pomyślnie zarejestrowano zdarzenie.');
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
        case 422:
          toast.error(data.error);
          break;
        default:
          toast.error('Bład serwera. Spróbuj ponownie później.');
          break;
      }
    },
  });

  return {
    createRental: mutation.mutate,
    isPending: mutation.isPending,
    fieldErrors,
  };
}

export function useCreateLoss(options?: { onSuccess?: () => void }) {
  const queryClient = useQueryClient();
  const eventsApi = useEventsApi();

  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const mutation = useMutation<
    EventResponse,
    {
      status: number;
      data: ValidationErrorResponse;
    },
    CreateLossDto
  >({
    mutationFn: (data: CreateLossDto) => eventsApi.createLoss(data),

    onMutate: () => setFieldErrors({}),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['events'] });
      toast.success('Pomyślnie zarejestrowano zdarzenie.');
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
        case 422:
          toast.error(data.error);
          break;
        default:
          toast.error('Bład serwera. Spróbuj ponownie później.');
          break;
      }
    },
  });

  return {
    createLoss: mutation.mutate,
    isPending: mutation.isPending,
    fieldErrors,
  };
}

export function useCreateReturn(options?: { onSuccess?: () => void }) {
  const queryClient = useQueryClient();
  const eventsApi = useEventsApi();

  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const mutation = useMutation<
    EventResponse,
    {
      status: number;
      data: ValidationErrorResponse;
    },
    CreateReturnDto
  >({
    mutationFn: (data: CreateReturnDto) => eventsApi.createReturn(data),

    onMutate: () => setFieldErrors({}),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['events'] });
      toast.success('Pomyślnie zarejestrowano zdarzenie.');
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
        case 422:
          toast.error(data.error);
          break;
        default:
          toast.error('Bład serwera. Spróbuj ponownie później.');
          break;
      }
    },
  });

  return {
    createReturn: mutation.mutate,
    isPending: mutation.isPending,
    fieldErrors,
  };
}

export function useDeleteEvent() {
  const queryClient = useQueryClient();
  const eventsApi = useEventsApi();

  return useMutation({
    mutationFn: (id: number) => eventsApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['events'] });
    },
  });
}

// import useApiClient from '../useApiClient';

export interface DashboardStats {
  totalEvents: number;
  eventsByType: {
    wypozyczenie: number;
    zwrot: number;
    zagubienie: number;
  };
  uniqueUsers: number;
  activeRentals: number;
  mostPopularItem: {
    itemId: number;
    count: number;
  };
  averageRentalDuration: string;
  eventsLast30Days: { day: string; count: number }[];
}
export function useDashboard() {
  // const apiClient = useApiClient();
  return useQuery({
    queryKey: ['dashboard'],
    queryFn: async () => {
      // const res = await apiClient.get('/events/dashboard');
      // return res.data;
      return {
        data: {
          totalEvents: 20,
          eventsByType: {
            wypozyczenie: 10,
            zwrot: 9,
            zagubienie: 1,
          },
          uniqueUsers: 12,
          activeRentals: 5,
          mostPopularItem: {
            itemId: 2,
            itemCode: 'KRA-D-GOR-1',
            count: 4,
          },
          averageRentalDuration: '2.5',
          eventsLast30Days: [
            { day: '2026-01-27', count: 4 },
            { day: '2026-01-26', count: 3 },
            { day: '2026-01-25', count: 5 },
            { day: '2026-01-24', count: 2 },
            { day: '2026-01-20', count: 6 },
          ],
        },
      };
    },
  });
}
