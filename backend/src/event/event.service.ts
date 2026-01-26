import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { Event } from './entities/event.entity';
import { EventDto } from './dto/event.dto';
import { EventDetailsDto } from './dto/event-details.dto';
import { UserDto } from '../user/dto/user.dto';
import { EventQueryDto } from './dto/event-query.dto';
import { plainToInstance } from 'class-transformer';
import { CreateRentalDto } from './dto/create-rental.dto';
import { CreateLossDto } from './dto/create-loss.dto';
import { CreateReturnDto } from './dto/create-return.dto';
import { EventType } from './enums/event-type.enum';

@Injectable()
export class EventService {
  constructor(
    @InjectRepository(Event)
    private readonly events: Repository<Event>,
    private readonly dataSource: DataSource,
  ) {}

  async createRental(dto: CreateRentalDto): Promise<EventDto> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const result = await queryRunner.query(
        `SELECT * FROM create_rental($1,$2,$3,$4,$5,$6)`,
        [
          dto.userId,
          dto.approvedBy,
          dto.itemIds,
          dto.purposeType ?? null,
          dto.purposeDescription ?? null,
          dto.plannedReturnDate,
        ],
      );

      if (!result.length)
        throw new BadRequestException('Failed to create rental');

      const eventId = result[0].create_rental[0];
      await queryRunner.commitTransaction();

      const event = await this.events.findOne({
        where: { id: eventId },
        relations: ['user', 'approver'],
      });

      if (!event) throw new NotFoundException();

      return plainToInstance(EventDto, {
        id: event.id,
        type: event.type,
        userId: event.user.id,
        userName: `${event.user.firstName} ${event.user.lastName}`,
        approvedBy: event.approvedBy.id,
        approverName: `${event.approvedBy.firstName} ${event.approvedBy.lastName}`,
        createdAt: event.createdAt,
      });
    } catch (err: any) {
      await queryRunner.rollbackTransaction();
      if (err.code === 'P1001') throw new BadRequestException(err.message);
      throw err;
    } finally {
      await queryRunner.release();
    }
  }

  async createLoss(dto: CreateLossDto): Promise<EventDto> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const result = await queryRunner.query(
        `SELECT * FROM create_loss($1,$2,$3,$4)`,
        [dto.userId, dto.approvedBy, dto.itemIds, dto.description ?? null],
      );

      if (!result.length)
        throw new BadRequestException('Failed to create loss');

      const eventId = result[0].create_loss[0];
      await queryRunner.commitTransaction();

      const event = await this.events.findOne({
        where: { id: eventId },
        relations: ['user', 'approver'],
      });

      if (!event) throw new NotFoundException();

      return plainToInstance(EventDto, {
        id: event.id,
        type: event.type,
        userId: event.user.id,
        userName: `${event.user.firstName} ${event.user.lastName}`,
        approvedBy: event.approvedBy.id,
        approverName: `${event.approvedBy.firstName} ${event.approvedBy.lastName}`,
        createdAt: event.createdAt,
      });
    } catch (err: any) {
      await queryRunner.rollbackTransaction();
      if (err.code === 'P1001') throw new BadRequestException(err.message);
      throw err;
    } finally {
      await queryRunner.release();
    }
  }

  async createReturn(dto: CreateReturnDto): Promise<EventDto> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const result = await queryRunner.query(
        `SELECT * FROM create_return($1,$2,$3,$4,$5)`,
        [
          dto.userId,
          dto.approvedBy,
          dto.itemIds,
          dto.status ?? null,
          dto.description ?? null,
        ],
      );

      if (!result.length)
        throw new BadRequestException('Failed to create return');

      const eventId = result[0].create_return[0];
      await queryRunner.commitTransaction();

      const event = await this.events.findOne({
        where: { id: eventId },
        relations: ['user', 'approver'],
      });

      if (!event) throw new NotFoundException();

      return plainToInstance(EventDto, {
        id: event.id,
        type: event.type,
        userId: event.user.id,
        userName: `${event.user.firstName} ${event.user.lastName}`,
        approvedBy: event.approvedBy.id,
        approverName: `${event.approvedBy.firstName} ${event.approvedBy.lastName}`,
        createdAt: event.createdAt,
      });
    } catch (err: any) {
      await queryRunner.rollbackTransaction();
      if (err.code === 'P1001') throw new BadRequestException(err.message);
      throw err;
    } finally {
      await queryRunner.release();
    }
  }

  async findAll(
    query: EventQueryDto,
  ): Promise<{ data: EventDto[]; total: number }> {
    const qb = this.events
      .createQueryBuilder('e')
      .leftJoinAndSelect('e.user', 'u')
      .leftJoinAndSelect('e.approver', 'a');

    if (query.search) {
      qb.andWhere(
        `(u.firstName ILIKE :s OR u.lastName ILIKE :s OR a.firstName ILIKE :s OR a.lastName ILIKE :s)`,
        { s: `%${query.search}%` },
      );
    }

    if (query.type) qb.andWhere(`e.type = :type`, { type: query.type });
    if (query.createdAtFrom)
      qb.andWhere(`e.createdAt >= :from`, { from: query.createdAtFrom });
    if (query.createdAtTo) {
      const to = new Date(query.createdAtTo);
      to.setDate(to.getDate() + 1);
      qb.andWhere(`e.createdAt < :to`, { to });
    }

    const total = await qb.getCount();

    // sorting
    qb.orderBy(`i.${query.sort ?? 'id'}`, query.order);

    // pagination
    qb.skip(query.offset).take(query.limit);

    const rows = await qb.getMany();

    const data = rows.map((e) =>
      plainToInstance(EventDto, {
        id: e.id,
        type: e.type,
        userId: e.user.id,
        userName: `${e.user.firstName} ${e.user.lastName}`,
        approvedBy: e.approvedBy.id,
        approverName: `${e.approvedBy.firstName} ${e.approvedBy.lastName}`,
        createdAt: e.createdAt,
      }),
    );

    return { data, total };
  }

  async findOne(id: number): Promise<EventDetailsDto> {
    const event = await this.events.findOne({
      where: { id },
      relations: [
        'user',
        'approver',
        'items',
        'items.item',
        'items.rentalDetails',
        'items.lossDetails',
        'items.returnDetails',
      ],
    });

    if (!event) throw new NotFoundException();

    return plainToInstance(EventDetailsDto, {
      id: event.id,
      type: event.type,
      user: plainToInstance(UserDto, event.user),
      approver: plainToInstance(UserDto, event.approvedBy),
      items: event.items.map((ei) => {
        const details =
          event.type === EventType.RENTAL
            ? ei.rentalDetails
            : event.type === EventType.LOSS
              ? ei.lossDetails
              : ei.returnDetails;
        return { item: ei.item, details };
      }),
      createdAt: event.createdAt,
    });
  }

  async delete(id: number): Promise<void> {
    const event = await this.events.findOne({ where: { id } });
    if (!event) throw new NotFoundException();

    await this.events.remove(event);
  }
}
