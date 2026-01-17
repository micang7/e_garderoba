import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

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

  @ApiProperty({ example: 'administrator' })
  @Expose()
  role: string;

  @ApiProperty({ example: '2026-01-17T14:34:11.876Z' })
  @Expose()
  createdAt: Date;
}
