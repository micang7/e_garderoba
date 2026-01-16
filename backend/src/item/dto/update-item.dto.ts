import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  ValidateIf,
} from 'class-validator';
import { ItemGender } from '../../common/enums/item-gender.enum';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { Trim } from '../../common/validation/decorators/trim.decorator';

export class UpdateItemDto {
  @ApiPropertyOptional({ example: '' })
  @MaxLength(50)
  @IsString()
  @IsNotEmpty()
  @ValidateIf((o, v) => v !== undefined)
  @Trim()
  code?: string;

  @ApiPropertyOptional({ example: '' })
  @MaxLength(100)
  @IsString()
  @IsNotEmpty()
  @ValidateIf((o, v) => v !== undefined)
  @Trim()
  name?: string;

  @ApiPropertyOptional({ example: '' })
  @MaxLength(255)
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  @Trim()
  size?: string;

  @ApiPropertyOptional({ example: '' })
  @IsEnum(ItemGender)
  @IsOptional()
  gender?: ItemGender;

  @ApiPropertyOptional({ example: '' })
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  @Trim()
  description?: string;
}
