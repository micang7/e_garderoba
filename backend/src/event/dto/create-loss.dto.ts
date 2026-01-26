import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Trim } from '../../common/validation/decorators/trim.decorator';

export class CreateLossDto {
  @ApiProperty({ example: 4 })
  @IsInt()
  userId: number;

  @ApiProperty({ example: 2 })
  @IsInt()
  approvedBy: number;

  @ApiProperty({ example: [1, 2, 3] })
  @IsInt({ each: true })
  itemIds: number[];

  @ApiPropertyOptional({
    example: null,
  })
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  @Trim()
  description?: string;
}
