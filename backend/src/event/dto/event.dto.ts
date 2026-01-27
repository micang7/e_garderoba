import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { EventType } from '../enums/event-type.enum';

export class EventDto {
  @ApiProperty({ example: 1 })
  @Expose()
  id: number;

  @ApiProperty({ enum: EventType, example: EventType.RENTAL })
  @Expose()
  type?: EventType;

  @ApiProperty({ example: 1 })
  @Expose()
  userId: number;

  @ApiProperty({ example: 'Adam Nowak' })
  @Expose()
  userName: string;

  @ApiProperty({ example: 2 })
  @Expose()
  approvedBy: number;

  @ApiProperty({ example: 'Jan Kowalski' })
  @Expose()
  approverName: string;

  @ApiProperty({ example: '2026-01-17T14:34:11.876' })
  @Expose()
  createdAt: Date;
}
