import { ApiProperty } from '@nestjs/swagger';
import { ListResponseDto } from '../../common/dto/list-response.dto';
import { ItemDto } from './item.dto';

export class ItemListResponseDto extends ListResponseDto {
  @ApiProperty({ type: ItemDto, isArray: true })
  data: ItemDto[];
}
