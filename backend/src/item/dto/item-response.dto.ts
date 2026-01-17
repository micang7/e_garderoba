import { ApiProperty } from '@nestjs/swagger';
import { ItemDto } from './item.dto';

export class ItemResponseDto {
  @ApiProperty({ type: ItemDto })
  data: ItemDto;
}
