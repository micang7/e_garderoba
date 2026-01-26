import { Entity, PrimaryColumn, Column, OneToOne, JoinColumn } from 'typeorm';
import { EventItem } from './eventItem.entity';

@Entity('loss_details')
export class LossDetails {
  @PrimaryColumn()
  id: number;

  @OneToOne(() => EventItem, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'id' })
  item: EventItem;

  @Column({ length: 500, nullable: true })
  description?: string;
}
