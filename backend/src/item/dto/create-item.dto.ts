import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';
import { ItemGender } from '../../common/enums/item-gender.enum';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Trim } from '../../common/validation/decorators/trim.decorator';

export class CreateItemDto {
  @ApiProperty({ example: 'RZE-M-SPD-1' })
  @MaxLength(50)
  @IsNotEmpty()
  @IsString()
  @Trim()
  code: string;

  @ApiProperty({ example: 'Spodnie rzeszowskie' })
  @MaxLength(100)
  @IsNotEmpty()
  @IsString()
  @Trim()
  name: string;

  @ApiPropertyOptional({
    example: 'talia: 88 cm / biodra: 104 cm / nogawka: 82 cm',
  })
  @MaxLength(255)
  @IsNotEmpty()
  @IsString()
  @IsOptional()
  @Trim()
  size?: string;

  @ApiPropertyOptional({ example: 'męski' })
  @IsEnum(ItemGender)
  @IsOptional()
  gender?: ItemGender;

  @ApiPropertyOptional({ example: '' })
  @IsNotEmpty()
  @IsString()
  @IsOptional()
  @Trim()
  description?: string;
}
