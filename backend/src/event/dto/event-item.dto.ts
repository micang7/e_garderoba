import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { ItemDto } from 'src/item/dto/item.dto';
import { RentalDto } from './rental.dto';
import { LossDto } from './loss.dto';
import { ReturnDto } from './return.dto';

export class EventItemDto {
  @ApiProperty()
  @Expose()
  item: ItemDto;

  @ApiProperty()
  @Expose()
  details: RentalDto | LossDto | ReturnDto;
}
