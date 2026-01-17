import { Expose } from 'class-transformer';
import { ItemGender } from '../enums/item-gender.enum';
import { ApiProperty } from '@nestjs/swagger';

export class ItemDto {
  @ApiProperty({ example: 1 })
  @Expose()
  id: number;

  @ApiProperty({ example: 'RZE-M-SPD-1' })
  @Expose()
  code: string;

  @ApiProperty({ example: 'Spodnie rzeszowskie' })
  @Expose()
  name: string;

  @ApiProperty({ example: 'talia: 88 cm / biodra: 104 cm / nogawka: 82 cm' })
  @Expose()
  size?: string;

  @ApiProperty({ enum: ItemGender, example: 'męski' })
  @Expose()
  gender?: ItemGender;

  @ApiProperty({
    example:
      'Niebieskie spodnie z czerwonym herbem na zewnętrznej stronie nogawek.',
  })
  @Expose()
  description?: string;

  @ApiProperty({ example: '2026-01-17T14:34:11.876Z' })
  @Expose()
  createdAt: Date;
}
