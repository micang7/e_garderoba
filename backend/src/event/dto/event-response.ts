import { ApiProperty } from '@nestjs/swagger';
import { EventDetailsDto } from './event-details.dto';
import { EventDto } from './event.dto';

export class EventResponseDto {
  @ApiProperty({ type: EventDetailsDto })
  data: EventDto | EventDetailsDto;
}
