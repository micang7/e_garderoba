import type { components } from '../types';

type EventListResponse = components['schemas']['EventListResponseDto'];
type EventResponse = components['schemas']['EventResponseDto'];
type CreateRentalDto = components['schemas']['CreateRentalDto'];
type CreateLossDto = components['schemas']['CreateLossDto'];
type CreateReturnDto = components['schemas']['CreateReturnDto'];
type Event = components['schemas']['EventDto'];
type EventDetails = components['schemas']['EventDetailsDto'];
type EventQuery = components['schemas']['EventQueryDto'];
type Rental = components['schemas']['RentalDto'];
type Loss = components['schemas']['LossDto'];
type Return = components['schemas']['ReturnDto'];

export type {
  EventListResponse,
  EventResponse,
  CreateRentalDto,
  CreateLossDto,
  CreateReturnDto,
  Event,
  EventDetails,
  EventQuery,
  Rental,
  Loss,
  Return,
};
