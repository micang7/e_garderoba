import { Entity, PrimaryColumn, Column, OneToOne, JoinColumn } from 'typeorm';
import { EventItem } from './eventItem.entity';
import { ReturnStatus } from '../enums/return-status.enum';

@Entity('return_details')
export class ReturnDetails {
  @PrimaryColumn()
  id: number;

  @OneToOne(() => EventItem, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'id' })
  item: EventItem;

  @Column({
    type: 'enum',
    enum: ReturnStatus,
    nullable: true,
  })
  status?: ReturnStatus;

  @Column({ nullable: true })
  description?: string;
}
