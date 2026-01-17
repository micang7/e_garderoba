import { IsOptional, IsString, IsEnum, IsDateString } from 'class-validator';
import { UserRole } from '../enums/user-role.enum';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { QueryDto } from '../../common/dto/query.dto';
import { UserSortFields } from '../enums/user-sort-fields.enum';

export class UserQueryDto extends QueryDto {
  @ApiPropertyOptional({ enum: UserSortFields, example: '' })
  @IsEnum(UserSortFields)
  @IsOptional()
  sort?: UserSortFields;

  @ApiPropertyOptional({ example: '' })
  @IsString()
  @IsOptional()
  firstName?: string;

  @ApiPropertyOptional({ example: '' })
  @IsString()
  @IsOptional()
  lastName?: string;

  @ApiPropertyOptional({ example: '' })
  @IsString()
  @IsOptional()
  email?: string;

  @ApiPropertyOptional({ enum: UserRole, example: '' })
  @IsEnum(UserRole)
  @IsOptional()
  role?: UserRole;

  @ApiPropertyOptional({ example: '' })
  @IsDateString()
  @IsOptional()
  createdFrom?: string;

  @ApiPropertyOptional({ example: '' })
  @IsDateString()
  @IsOptional()
  createdTo?: string;
}
