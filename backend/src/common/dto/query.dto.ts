import {
  IsOptional,
  IsInt,
  Min,
  IsString,
  IsNotEmpty,
  IsEnum,
} from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import { SortOrder } from '../enums/sort-order.enum';

export class QueryDto {
  @ApiPropertyOptional({ example: '' })
  @Min(0)
  @IsInt()
  @IsOptional()
  @Type(() => Number)
  offset?: number = 0;

  @ApiPropertyOptional({ example: '' })
  @Min(1)
  @IsInt()
  @IsOptional()
  @Type(() => Number)
  limit?: number = 20;

  @ApiPropertyOptional({ example: '' })
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  search?: string;

  @ApiPropertyOptional({ enum: SortOrder, example: '' })
  @IsEnum(SortOrder)
  @IsOptional()
  @Transform(({ value }: { value: unknown }) =>
    typeof value === 'string' ? value?.toUpperCase() : value,
  )
  order?: SortOrder = SortOrder.ASC;
}
