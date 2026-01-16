import { IsOptional, IsString, IsEnum, IsDateString } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { ItemGender } from '../../common/enums/item-gender.enum';
import { QueryDto } from '../../common/dto/query.dto';
import { ItemSortFields } from '../../common/enums/item-sort-fields.enum';

export class ItemQueryDto extends QueryDto {
  @ApiPropertyOptional({ type: String, example: '' })
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

  @ApiPropertyOptional({ example: '' })
  @IsEnum(ItemGender)
  @IsOptional()
  gender?: ItemGender;

  @ApiPropertyOptional({ example: '' })
  @IsDateString()
  @IsOptional()
  createdFrom?: string;

  @ApiPropertyOptional({ example: '' })
  @IsDateString()
  @IsOptional()
  createdTo?: string;
}
