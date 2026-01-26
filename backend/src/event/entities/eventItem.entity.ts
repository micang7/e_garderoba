import {
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Event } from './event.entity';
import { Item } from '../../item/entities/item.entity';
import { RentalDetails } from './rentalDetails.entity';
import { LossDetails } from './lossDetails.entity';
import { ReturnDetails } from './returnDetails.entity';

@Entity('events_items')
export class EventItem {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Event, { nullable: false, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'eventId' })
  event: Event;

  @ManyToOne(() => Item, { nullable: false, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'itemId' })
  item: Item;

  @OneToOne(() => RentalDetails, (rentalDetails) => rentalDetails.item, {
    onDelete: 'CASCADE',
  })
  rentalDetails: RentalDetails;

  @OneToOne(() => LossDetails, (lossDetails) => lossDetails.item, {
    onDelete: 'CASCADE',
  })
  lossDetails: LossDetails;

  @OneToOne(() => ReturnDetails, (returnDetails) => returnDetails.item, {
    onDelete: 'CASCADE',
  })
  returnDetails: ReturnDetails;
}
