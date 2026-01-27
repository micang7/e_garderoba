import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { RentalPurposeType } from '../enums/rental-purpose-type';
import { Expose } from 'class-transformer';

export class RentalDto {
  @ApiPropertyOptional({
    enum: RentalPurposeType,
    example: RentalPurposeType.PERFORMANCE,
  })
  @Expose()
  purposeType?: RentalPurposeType;

  @ApiPropertyOptional({
    example: 'Jubileusz',
  })
  @Expose()
  purposeDescription?: string;

  @ApiProperty({
    example: '2026-01-30',
  })
  @Expose()
  plannedReturnDate: string;
}
