import { EventItem } from '../../event/entities/eventItem.entity';
import { ItemGender } from '../enums/item-gender.enum';
import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('items')
export class Item {
  @PrimaryGeneratedColumn()
  id: number;

  @Index({ unique: true })
  @Column({ length: 50 })
  code: string;

  @Column({ length: 100 })
  name: string;

  @Column({ length: 255, nullable: true })
  size?: string;

  @Column({
    type: 'enum',
    enum: ItemGender,
    nullable: true,
  })
  gender?: ItemGender;

  @Column({ nullable: true })
  description?: string;

  @Column({
    type: 'timestamp',
    default: () => 'LOCALTIMESTAMP',
  })
  createdAt: Date;

  @OneToMany(() => EventItem, (eventItem) => eventItem.item, { cascade: true })
  events: EventItem[];
}
