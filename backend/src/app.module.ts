import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ItemModule } from './item/item.module';
import { EventModule } from './event/event.module';
import { User } from './user/entities/user.entity';
import { Item } from './item/entities/item.entity';
import { Event } from './event/entities/event.entity';
import { EventItem } from './event/entities/eventItem.entity';
import { RentalDetails } from './event/entities/rentalDetails.entity';
import { LossDetails } from './event/entities/lossDetails.entity';
import { ReturnDetails } from './event/entities/returnDetails.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV}.local`,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        host: config.getOrThrow('POSTGRES_HOST'),
        port: config.getOrThrow('POSTGRES_PORT'),
        username: config.getOrThrow('POSTGRES_USER'),
        password: config.getOrThrow('POSTGRES_PASSWORD'),
        database: config.getOrThrow('POSTGRES_DB'),
        entities: [
          User,
          Item,
          Event,
          EventItem,
          RentalDetails,
          LossDetails,
          ReturnDetails,
        ],
        synchronize: process.env.NODE_ENV === 'test',
        dropSchema: process.env.NODE_ENV === 'test',
      }),
    }),
    AuthModule,
    EventModule,
    ItemModule,
    UserModule,
  ],
})
export class AppModule {}
