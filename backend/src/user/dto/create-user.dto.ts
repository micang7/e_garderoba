import {
  IsNotEmpty,
  MaxLength,
  IsEmail,
  IsOptional,
  Matches,
  IsEnum,
  IsString,
} from 'class-validator';
import { UserRole } from '../../common/enums/user-role.enum';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Trim } from '../../common/validation/decorators/trim.decorator';

export class CreateUserDto {
  @ApiProperty({ example: 'Jan' })
  @MaxLength(50)
  @IsString()
  @IsNotEmpty()
  @Trim()
  firstName: string;

  @ApiProperty({ example: 'Kowalski' })
  @MaxLength(50)
  @IsString()
  @IsNotEmpty()
  @Trim()
  lastName: string;

  @ApiProperty({ example: 'jkowalski@example.com' })
  @MaxLength(255)
  @IsEmail()
  @IsString()
  @IsNotEmpty()
  @Trim()
  email: string;

  @ApiPropertyOptional({ example: '123456789' })
  @Matches(/^[0-9+\-\s()]+$/)
  @MaxLength(20)
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  @Trim()
  phone?: string;

  @ApiProperty({ example: 'administrator' })
  @IsEnum(UserRole)
  role: UserRole;

  @ApiProperty({ example: 'jkowalski' })
  @IsString()
  @IsNotEmpty()
  password: string;
}
