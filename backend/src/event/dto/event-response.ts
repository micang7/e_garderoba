import { ApiExtraModels, ApiProperty, getSchemaPath } from '@nestjs/swagger';
import { EventDetailsDto } from './event-details.dto';
import { EventDto } from './event.dto';

@ApiExtraModels(EventDto, EventDetailsDto)
export class EventResponseDto {
  @ApiProperty({
    oneOf: [
      { $ref: getSchemaPath(EventDto) },
      { $ref: getSchemaPath(EventDetailsDto) },
    ],
  })
  data: EventDto | EventDetailsDto;
}
