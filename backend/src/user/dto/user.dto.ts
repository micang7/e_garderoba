import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { UserRole } from '../enums/user-role.enum';

export class UserDto {
  @ApiProperty({ example: 1 })
  @Expose()
  id: number;

  @ApiProperty({ example: 'Jan' })
  @Expose()
  firstName: string;

  @ApiProperty({ example: 'Kowalski' })
  @Expose()
  lastName: string;

  @ApiProperty({ example: 'jkowalski@example.com' })
  @Expose()
  email: string;

  @ApiProperty({ example: '123456789' })
  @Expose()
  phone?: string;

  @ApiProperty({ enum: UserRole, example: 'administrator' })
  @Expose()
  role: UserRole;

  @ApiProperty({ example: '2026-01-17T14:34:11.876Z' })
  @Expose()
  createdAt: Date;
}
