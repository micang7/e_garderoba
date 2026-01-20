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

@Entity()
export class EventItem {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Event, { nullable: false })
  @JoinColumn({ name: 'event_id' })
  event: Event;

  @ManyToOne(() => Item, { nullable: false })
  @JoinColumn({ name: 'item_id' })
  item: Item;

  @OneToOne(() => RentalDetails, (rentalDetails) => rentalDetails.item, {
    cascade: true,
  })
  rentalDetails: RentalDetails;

  @OneToOne(() => LossDetails, (lossDetails) => lossDetails.item, {
    cascade: true,
  })
  lossDetails: LossDetails;

  @OneToOne(() => ReturnDetails, (returnDetails) => returnDetails.item, {
    cascade: true,
  })
  returnDetails: ReturnDetails;
}
