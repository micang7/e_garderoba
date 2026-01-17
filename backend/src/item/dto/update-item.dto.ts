import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  ValidateIf,
} from 'class-validator';
import { ItemGender } from '../enums/item-gender.enum';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { Trim } from '../../common/validation/decorators/trim.decorator';

export class UpdateItemDto {
  @ApiPropertyOptional({ example: 'KRA-M-SPD-1' })
  @MaxLength(50)
  @IsString()
  @IsNotEmpty()
  @ValidateIf((o, v) => v !== undefined)
  @Trim()
  code?: string;

  @ApiPropertyOptional({ example: 'Spodnie krakowskie' })
  @MaxLength(100)
  @IsString()
  @IsNotEmpty()
  @ValidateIf((o, v) => v !== undefined)
  @Trim()
  name?: string;

  @ApiPropertyOptional({
    example: 'talia: 90 cm / biodra: 105 cm / nogawka: 86 cm',
  })
  @MaxLength(255)
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  @Trim()
  size?: string;

  @ApiPropertyOptional({ enum: ItemGender, example: null })
  @IsEnum(ItemGender)
  @IsOptional()
  gender?: ItemGender;

  @ApiPropertyOptional({
    example: 'Spodnie w biało czerwone paski wzdłuż nogawek.',
  })
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  @Trim()
  description?: string;
}
