import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { EventType } from '../enums/event-type.enum';
import { User } from '../../user/entities/user.entity';
import { EventItem } from './eventItem.entity';

@Entity('events')
export class Event {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'enum', enum: EventType })
  type: EventType;

  @ManyToOne(() => User, { nullable: false, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' })
  user: User;

  @ManyToOne(() => User, { nullable: false, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'approvedBy' })
  approver: User;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'LOCALTIMESTAMP',
  })
  createdAt: Date;

  @OneToMany(() => EventItem, (eventItem) => eventItem.event)
  items: EventItem[];
}
