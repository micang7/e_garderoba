import { ApiProperty } from '@nestjs/swagger';
import { EventDetailsDto } from './event-details.dto';

export class EventResponseDto {
  @ApiProperty({ type: EventDetailsDto })
  data: EventDetailsDto;
}
