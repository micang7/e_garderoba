import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';
import { ItemGender } from '../../common/enums/item-gender.enum';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { Trim } from '../../common/validation/decorators/trim.decorator';

export class UpdateItemDto {
  @ApiPropertyOptional({ example: '' })
  @MaxLength(50)
  @IsNotEmpty()
  @IsString()
  @IsOptional()
  @Trim()
  code?: string;

  @ApiPropertyOptional({ example: '' })
  @MaxLength(100)
  @IsNotEmpty()
  @IsString()
  @IsOptional()
  @Trim()
  name?: string;

  @ApiPropertyOptional({ example: '' })
  @MaxLength(255)
  @IsNotEmpty()
  @IsString()
  @IsOptional()
  @Trim()
  size?: string;

  @ApiPropertyOptional({ example: '' })
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
