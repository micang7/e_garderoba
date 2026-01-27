import {
  IsDateString,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { RentalPurposeType } from '../enums/rental-purpose-type';
import { Trim } from '../../common/validation/decorators/trim.decorator';

export class CreateRentalDto {
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
    enum: RentalPurposeType,
    example: RentalPurposeType.PERFORMANCE,
  })
  @IsEnum(RentalPurposeType)
  @IsOptional()
  purposeType?: RentalPurposeType;

  @ApiPropertyOptional({
    example: 'Jubileusz',
  })
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  @Trim()
  purposeDescription?: string;

  @ApiProperty({
    example: '2026-01-30',
  })
  @IsDateString()
  plannedReturnDate: string;
}
