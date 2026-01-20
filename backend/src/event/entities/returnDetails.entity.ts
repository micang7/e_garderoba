import { Entity, PrimaryColumn, Column, OneToOne, JoinColumn } from 'typeorm';
import { EventItem } from './eventItem.entity';
import { ReturnStatus } from '../enums/return-status.enum';

@Entity()
export class ReturnDetails {
  @PrimaryColumn()
  returnId: number;

  @OneToOne(() => EventItem)
  @JoinColumn({ name: 'return_id' })
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
