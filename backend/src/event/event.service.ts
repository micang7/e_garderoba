import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
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
    const eventId = await this.dataSource.transaction(async (manager) => {
      try {
        const result = await manager.query(
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

        if (!result.length) {
          throw new UnprocessableEntityException('Failed to create rental');
        }

        return (result[0] as { event_id: number }).event_id;
      } catch (e: any) {
        if (e.code === 'P1001')
          throw new UnprocessableEntityException(
            e.message.replace('P1001', ''),
          );
        else throw e;
      }
    });

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
      approvedBy: event.approver.id,
      approverName: `${event.approver.firstName} ${event.approver.lastName}`,
      createdAt: event.createdAt,
    });
  }

  async createLoss(dto: CreateLossDto): Promise<EventDto> {
    const eventId = await this.dataSource.transaction(async (manager) => {
      try {
        const result = await manager.query(
          `SELECT * FROM create_loss($1,$2,$3,$4)`,
          [dto.userId, dto.approvedBy, dto.itemIds, dto.description ?? null],
        );

        if (!result.length) {
          throw new UnprocessableEntityException('Failed to create loss');
        }

        return (result[0] as { event_id: number }).event_id;
      } catch (e: any) {
        if (e.code === 'P1001')
          throw new UnprocessableEntityException(
            e.message.replace('P1001', ''),
          );
        else throw e;
      }
    });

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
      approvedBy: event.approver.id,
      approverName: `${event.approver.firstName} ${event.approver.lastName}`,
      createdAt: event.createdAt,
    });
  }

  async createReturn(dto: CreateReturnDto): Promise<EventDto> {
    const eventId = await this.dataSource.transaction(async (manager) => {
      try {
        const result = await manager.query(
          `SELECT * FROM create_return($1,$2,$3,$4,$5)`,
          [
            dto.userId,
            dto.approvedBy,
            dto.itemIds,
            dto.status ?? null,
            dto.description ?? null,
          ],
        );

        if (!result.length) {
          throw new UnprocessableEntityException('Failed to create return');
        }

        return (result[0] as { event_id: number }).event_id;
      } catch (e: any) {
        if (e.code === 'P1001')
          throw new UnprocessableEntityException(
            e.message.replace('P1001', ''),
          );
        else throw e;
      }
    });

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
      approvedBy: event.approver.id,
      approverName: `${event.approver.firstName} ${event.approver.lastName}`,
      createdAt: event.createdAt,
    });
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
    qb.orderBy(`e.${query.sort ?? 'id'}`, query.order);

    // pagination
    qb.skip(query.offset).take(query.limit);

    const rows = await qb.getMany();

    const data = rows.map((e) =>
      plainToInstance(EventDto, {
        id: e.id,
        type: e.type,
        userId: e.user.id,
        userName: `${e.user.firstName} ${e.user.lastName}`,
        approvedBy: e.approver.id,
        approverName: `${e.approver.firstName} ${e.approver.lastName}`,
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
      approver: plainToInstance(UserDto, event.approver),
      eventItems: event.items.map((ei) => {
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
