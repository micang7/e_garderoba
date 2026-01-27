import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  Index,
  OneToMany,
} from 'typeorm';
import { UserRole } from '../enums/user-role.enum';
import { Event } from '../../event/entities/event.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50 })
  firstName: string;

  @Column({ length: 50 })
  lastName: string;

  @Index({ unique: true })
  @Column({ length: 255 })
  email: string;

  @Column({ length: 20, nullable: true })
  phone?: string;

  @Column({ length: 255 })
  passwordHash: string;

  @Column({
    type: 'enum',
    enum: UserRole,
  })
  role: UserRole;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'LOCALTIMESTAMP',
  })
  createdAt: Date;

  @OneToMany(() => Event, (event) => event.user)
  events: Event[];

  @OneToMany(() => Event, (event) => event.approver)
  approvedEvents: Event[];
}
