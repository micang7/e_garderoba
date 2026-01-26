import { Entity, PrimaryColumn, Column, OneToOne, JoinColumn } from 'typeorm';
import { EventItem } from './eventItem.entity';
import { RentalPurposeType } from '../enums/rental-purpose-type';

@Entity('rental_details')
export class RentalDetails {
  @PrimaryColumn()
  id: number;

  @OneToOne(() => EventItem, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'id' })
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
