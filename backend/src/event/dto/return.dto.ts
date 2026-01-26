import { ApiPropertyOptional } from '@nestjs/swagger';
import { ReturnStatus } from '../enums/return-status.enum';
import { Expose } from 'class-transformer';

export class ReturnDto {
  @ApiPropertyOptional({
    enum: ReturnStatus,
    example: ReturnStatus.UNDAMAGED,
  })
  @Expose()
  status?: ReturnStatus;

  @ApiPropertyOptional({
    example: null,
  })
  @Expose()
  description?: string;
}
