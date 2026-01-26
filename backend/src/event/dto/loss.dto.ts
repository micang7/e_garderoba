import { ApiPropertyOptional } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class LossDto {
  @ApiPropertyOptional({
    example: null,
  })
  @Expose()
  description?: string;
}
