import {
  IsOptional,
  IsInt,
  Min,
  IsString,
  IsNotEmpty,
  IsEnum,
} from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { SortOrder } from '../enums/sort-order.enum';

export class QueryDto {
  @ApiPropertyOptional({ example: '' })
  @Min(0)
  @IsInt()
  @IsOptional()
  @Type(() => Number)
  offset?: number;

  @ApiPropertyOptional({ example: '' })
  @Min(1)
  @IsInt()
  @IsOptional()
  @Type(() => Number)
  limit?: number;

  @ApiPropertyOptional({ example: '' })
  @IsNotEmpty()
  @IsString()
  @IsOptional()
  search?: string;

  @ApiPropertyOptional({ example: '' })
  @IsEnum(SortOrder)
  @IsOptional()
  order?: string;
}
