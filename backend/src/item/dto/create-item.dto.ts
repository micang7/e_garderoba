import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';
import { ItemGender } from '../enums/item-gender.enum';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Trim } from '../../common/validation/decorators/trim.decorator';

export class CreateItemDto {
  @ApiProperty({ example: 'RZE-M-SPD-1' })
  @MaxLength(50)
  @IsString()
  @IsNotEmpty()
  @Trim()
  code: string;

  @ApiProperty({ example: 'Spodnie rzeszowskie' })
  @MaxLength(100)
  @IsString()
  @IsNotEmpty()
  @Trim()
  name: string;

  @ApiPropertyOptional({
    example: 'talia: 88 cm / biodra: 104 cm / nogawka: 82 cm',
  })
  @MaxLength(255)
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  @Trim()
  size?: string;

  @ApiPropertyOptional({ enum: ItemGender, example: 'męski' })
  @IsEnum(ItemGender)
  @IsOptional()
  gender?: ItemGender;

  @ApiPropertyOptional({
    example:
      'Niebieskie spodnie z czerwonym herbem na zewnętrznej stronie nogawek.',
  })
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  @Trim()
  description?: string;
}
