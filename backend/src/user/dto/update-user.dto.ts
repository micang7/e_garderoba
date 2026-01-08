import {
  IsString,
  IsNotEmpty,
  MaxLength,
  MinLength,
  IsEmail,
  Matches,
  IsEnum,
  IsOptional,
} from 'class-validator';
import { UserRole } from '../../common/enums/user-role.enum';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UserUpdateDto {
  @ApiPropertyOptional({ example: '' })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  @MaxLength(50)
  firstName?: string;

  @ApiPropertyOptional({ example: '' })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  @MaxLength(50)
  lastName?: string;

  @ApiPropertyOptional({ example: '' })
  @IsOptional()
  @IsEmail()
  @IsNotEmpty()
  @MaxLength(255)
  email?: string;

  @ApiPropertyOptional({ example: '' })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @MaxLength(20)
  @Matches(/^[0-9+\-\s()]+$/)
  phone?: string;

  @ApiPropertyOptional({ example: '' })
  @IsOptional()
  @IsEnum(UserRole)
  @IsNotEmpty()
  role?: UserRole;
}
