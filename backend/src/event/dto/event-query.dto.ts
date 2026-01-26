import { IsOptional, IsEnum, IsDateString } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { QueryDto } from '../../common/dto/query.dto';
import { EventSortFields } from '../enums/event-sort-fields.enum';
import { EventType } from '../enums/event-type.enum';

export class EventQueryDto extends QueryDto {
  @ApiPropertyOptional({ enum: EventSortFields, example: '' })
  @IsEnum(EventSortFields)
  @IsOptional()
  sort?: EventSortFields;

  @ApiPropertyOptional({ enum: EventType, example: '' })
  @IsEnum(EventType)
  @IsOptional()
  type?: EventType;

  @ApiPropertyOptional({ example: '' })
  @IsDateString()
  @IsOptional()
  createdAtFrom?: string;

  @ApiPropertyOptional({ example: '' })
  @IsDateString()
  @IsOptional()
  createdAtTo?: string;
}
