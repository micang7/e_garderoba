import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
import { User } from '../user/entities/user.entity';
import { Item } from '../item/entities/item.entity';
import { EventItem } from '../event/entities/eventItem.entity';
import { RentalDetails } from '../event/entities/rentalDetails.entity';
import { LossDetails } from '../event/entities/lossDetails.entity';
import { ReturnDetails } from '../event/entities/returnDetails.entity';
import { Event } from '../event/entities/event.entity';
dotenv.config({ path: `.env.${process.env.NODE_ENV}.local` });

export default new DataSource({
  type: 'postgres',
  host: process.env.POSTGRES_HOST,
  port: Number(process.env.POSTGRES_PORT),
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  entities: [
    User,
    Item,
    Event,
    EventItem,
    RentalDetails,
    LossDetails,
    ReturnDetails,
  ],
  migrations: [
    process.env.NODE_ENV === 'production'
      ? 'dist/database/migrations/*.js'
      : 'src/database/migrations/*.ts',
  ],
});
