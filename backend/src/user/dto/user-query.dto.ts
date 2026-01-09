import {
  IsOptional,
  IsInt,
  Min,
  IsString,
  IsEnum,
  IsDateString,
} from 'class-validator';
import { UserRole } from '../../common/enums/user-role.enum';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UserQueryDto {
  @ApiPropertyOptional({ example: '' })
  @IsOptional()
  @IsInt()
  @Min(0)
  offset?: number;

  @ApiPropertyOptional({ example: '' })
  @IsOptional()
  @IsInt()
  @Min(1)
  limit?: number;

  @ApiPropertyOptional({ example: '' })
  @IsOptional()
  @IsString()
  sort?: string;

  @ApiPropertyOptional({ example: '' })
  @IsOptional()
  @IsString()
  order?: string;

  @ApiPropertyOptional({ example: '' })
  @IsOptional()
  @IsString()
  search?: string;

  @ApiPropertyOptional({ example: '' })
  @IsOptional()
  @IsString()
  firstName?: string;

  @ApiPropertyOptional({ example: '' })
  @IsOptional()
  @IsString()
  lastName?: string;

  @ApiPropertyOptional({ example: '' })
  @IsOptional()
  @IsString()
  email?: string;

  @ApiPropertyOptional({ example: '' })
  @IsOptional()
  @IsEnum(UserRole)
  role?: UserRole;

  @ApiPropertyOptional({ example: '' })
  @IsOptional()
  @IsDateString()
  createdFrom?: string;

  @ApiPropertyOptional({ example: '' })
  @IsOptional()
  @IsDateString()
  createdTo?: string;
}
