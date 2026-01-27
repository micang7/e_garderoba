import { Expose } from 'class-transformer';
import { ApiExtraModels, ApiProperty, getSchemaPath } from '@nestjs/swagger';
import { ItemDto } from '../../item/dto/item.dto';
import { RentalDto } from './rental.dto';
import { LossDto } from './loss.dto';
import { ReturnDto } from './return.dto';

@ApiExtraModels(RentalDto, LossDto, ReturnDto)
export class EventItemDto {
  @ApiProperty({ type: ItemDto })
  @Expose()
  item: ItemDto;

  @ApiProperty({
    oneOf: [
      { $ref: getSchemaPath(RentalDto) },
      { $ref: getSchemaPath(LossDto) },
      { $ref: getSchemaPath(ReturnDto) },
    ],
  })
  @Expose()
  details: RentalDto | LossDto | ReturnDto;
}
