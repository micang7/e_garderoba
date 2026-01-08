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

export class UserCreateDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  @MaxLength(50)
  firstName: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  @MaxLength(50)
  lastName: string;

  @IsEmail({})
  @IsNotEmpty()
  @MaxLength(255)
  email: string;

  @IsOptional()
  @MaxLength(20)
  @Matches(/^[0-9+\-\s()]+$/)
  phone?: string;

  @IsEnum(UserRole)
  @IsNotEmpty()
  role: UserRole;

  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  password: string;
}
