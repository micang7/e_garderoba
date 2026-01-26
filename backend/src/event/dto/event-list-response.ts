import { ApiProperty } from '@nestjs/swagger';
import { ListResponseDto } from '../../common/dto/list-response.dto';
import { EventDto } from './event.dto';

export class EventListResponseDto extends ListResponseDto {
  @ApiProperty({ type: EventDto, isArray: true })
  data: EventDto[];
}
