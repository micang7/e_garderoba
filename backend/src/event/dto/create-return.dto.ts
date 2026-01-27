import {
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Trim } from '../../common/validation/decorators/trim.decorator';
import { ReturnStatus } from '../enums/return-status.enum';

export class CreateReturnDto {
  @ApiProperty({ example: 4 })
  @IsInt()
  userId: number;

  @ApiProperty({ example: 2 })
  @IsInt()
  approvedBy: number;

  @ApiProperty({ type: Number, isArray: true, example: [1, 2, 3] })
  @IsInt({ each: true })
  itemIds: number[];

  @ApiPropertyOptional({
    enum: ReturnStatus,
    example: ReturnStatus.UNDAMAGED,
  })
  @IsEnum(ReturnStatus)
  @IsOptional()
  status?: ReturnStatus;

  @ApiPropertyOptional({
    example: null,
  })
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  @Trim()
  description?: string;
}
