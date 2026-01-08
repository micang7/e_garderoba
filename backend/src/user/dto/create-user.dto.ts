import {
  IsString,
  IsNotEmpty,
  MaxLength,
  MinLength,
  IsEmail,
  IsOptional,
  Matches,
  IsEnum,
} from 'class-validator';
import { UserRole } from '../../common/enums/user-role.enum';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class UserCreateDto {
  @ApiProperty({ example: 'Jan' })
  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  @MaxLength(50)
  firstName: string;

  @ApiProperty({ example: 'Kowalski' })
  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  @MaxLength(50)
  lastName: string;

  @ApiProperty({ example: 'jkowalski@example.com' })
  @IsEmail()
  @IsNotEmpty()
  @MaxLength(255)
  email: string;

  @ApiPropertyOptional({ example: '123456789' })
  @IsOptional()
  @MaxLength(20)
  @Matches(/^[0-9+\-\s()]+$/)
  phone?: string;

  @ApiProperty({ example: 'administrator' })
  @IsEnum(UserRole)
  @IsNotEmpty()
  role: UserRole;

  @ApiProperty({ example: 'jkowalski' })
  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  password: string;
}
