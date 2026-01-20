import { Entity, PrimaryColumn, Column, OneToOne, JoinColumn } from 'typeorm';
import { EventItem } from './eventItem.entity';

@Entity()
export class LossDetails {
  @PrimaryColumn()
  lossId: number;

  @OneToOne(() => EventItem)
  @JoinColumn({ name: 'loss_id' })
  item: EventItem;

  @Column({ length: 500, nullable: true })
  description?: string;
}
