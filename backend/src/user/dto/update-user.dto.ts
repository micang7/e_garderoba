import {
  MaxLength,
  IsEmail,
  Matches,
  IsEnum,
  IsOptional,
  IsString,
  IsNotEmpty,
  ValidateIf,
} from 'class-validator';
import { UserRole } from '../../common/enums/user-role.enum';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { Trim } from '../../common/validation/decorators/trim.decorator';

export class UpdateUserDto {
  @ApiPropertyOptional({ example: '' })
  @MaxLength(50)
  @IsString()
  @IsNotEmpty()
  @ValidateIf((o, v) => v !== undefined)
  @Trim()
  firstName?: string;

  @ApiPropertyOptional({ example: '' })
  @MaxLength(50)
  @IsString()
  @IsNotEmpty()
  @ValidateIf((o, v) => v !== undefined)
  @Trim()
  lastName?: string;

  @ApiPropertyOptional({ example: '' })
  @MaxLength(255)
  @IsEmail()
  @IsString()
  @IsNotEmpty()
  @ValidateIf((o, v) => v !== undefined)
  @Trim()
  email?: string;

  @ApiPropertyOptional({ example: '' })
  @Matches(/^[0-9+\-\s()]+$/)
  @MaxLength(20)
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  @Trim()
  phone?: string;

  @ApiPropertyOptional({ example: '' })
  @IsEnum(UserRole)
  @ValidateIf((o, v) => v !== undefined)
  role?: UserRole;
}
