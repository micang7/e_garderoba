import {
  MaxLength,
  IsEmail,
  Matches,
  IsEnum,
  IsOptional,
  IsString,
  IsNotEmpty,
} from 'class-validator';
import { UserRole } from '../../common/enums/user-role.enum';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { Trim } from '../../common/validation/decorators/trim.decorator';

export class UpdateUserDto {
  @ApiPropertyOptional({ example: '' })
  @MaxLength(50)
  @IsNotEmpty()
  @IsString()
  @IsOptional()
  @Trim()
  firstName?: string;

  @ApiPropertyOptional({ example: '' })
  @MaxLength(50)
  @IsNotEmpty()
  @IsString()
  @IsOptional()
  @Trim()
  lastName?: string;

  @ApiPropertyOptional({ example: '' })
  @MaxLength(255)
  @IsEmail()
  @IsString()
  @IsOptional()
  @Trim()
  email?: string;

  @ApiPropertyOptional({ example: '' })
  @Matches(/^[0-9+\-\s()]+$/)
  @MaxLength(20)
  @IsString()
  @IsOptional()
  @Trim()
  phone?: string;

  @ApiPropertyOptional({ example: '' })
  @IsEnum(UserRole)
  @IsOptional()
  role?: UserRole;
}
