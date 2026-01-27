import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { EventType } from '../enums/event-type.enum';
import { UserDto } from '../../user/dto/user.dto';
import { EventItemDto } from './event-item.dto';

export class EventDetailsDto {
  @ApiProperty({ example: 1 })
  @Expose()
  id: number;

  @ApiProperty({ enum: EventType, example: EventType.RENTAL })
  @Expose()
  type?: EventType;

  @ApiProperty({ type: UserDto })
  @Expose()
  user: UserDto;

  @ApiProperty({ type: UserDto })
  @Expose()
  approver: UserDto;

  @ApiProperty({ type: EventItemDto, isArray: true })
  @Expose()
  eventItems: EventItemDto[];

  @ApiProperty({ example: '2026-01-17T14:34:11.876' })
  @Expose()
  createdAt: Date;
}
