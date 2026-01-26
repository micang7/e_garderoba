import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { EventType } from '../enums/event-type.enum';
import { UserDto } from 'src/user/dto/user.dto';
import { EventItemDto } from './event-item.dto';

export class EventDetailsDto {
  @ApiProperty({ example: 1 })
  @Expose()
  id: number;

  @ApiProperty({ enum: EventType, example: EventType.RENTAL })
  @Expose()
  type?: EventType;

  @ApiProperty()
  @Expose()
  user: UserDto;

  @ApiProperty()
  @Expose()
  approver: UserDto;

  @ApiProperty()
  @Expose()
  eventItems: EventItemDto[];

  @ApiProperty({ example: '2026-01-17T14:34:11.876' })
  @Expose()
  createdAt: Date;
}
