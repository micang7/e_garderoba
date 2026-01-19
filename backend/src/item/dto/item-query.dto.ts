import { IsOptional, IsString, IsEnum, IsDateString } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { ItemGender } from '../enums/item-gender.enum';
import { QueryDto } from '../../common/dto/query.dto';
import { ItemSortFields } from '../enums/item-sort-fields.enum';

export class ItemQueryDto extends QueryDto {
  @ApiPropertyOptional({ enum: ItemSortFields, example: '' })
  @IsEnum(ItemSortFields)
  @IsOptional()
  sort?: ItemSortFields;

  @ApiPropertyOptional({ example: '' })
  @IsString()
  @IsOptional()
  code?: string;

  @ApiPropertyOptional({ example: '' })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiPropertyOptional({ enum: ItemGender, example: '' })
  @IsEnum(ItemGender)
  @IsOptional()
  gender?: ItemGender;

  @ApiPropertyOptional({ example: '' })
  @IsDateString()
  @IsOptional()
  createdAtFrom?: string;

  @ApiPropertyOptional({ example: '' })
  @IsDateString()
  @IsOptional()
  createdAtTo?: string;
}
