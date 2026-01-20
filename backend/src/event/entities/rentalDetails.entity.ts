import { Entity, PrimaryColumn, Column, OneToOne, JoinColumn } from 'typeorm';
import { EventItem } from './eventItem.entity';
import { RentalPurposeType } from '../enums/rental-purpose-type';

@Entity()
export class RentalDetails {
  @PrimaryColumn()
  rentalId: number;

  @OneToOne(() => EventItem)
  @JoinColumn({ name: 'rental_id' })
  item: EventItem;

  @Column({
    type: 'enum',
    enum: RentalPurposeType,
    nullable: true,
  })
  purposeType?: RentalPurposeType;

  @Column({ length: 500, nullable: true })
  purposeDescription?: string;

  @Column({ type: 'timestamp' })
  plannedReturnDate: Date;
}
