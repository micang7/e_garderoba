import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Item } from './entities/item.entity';
import { Repository } from 'typeorm';
import { ItemDto } from './dto/item.dto';
import { plainToInstance } from 'class-transformer';
import { ItemQueryDto } from './dto/item-query.dto';

@Injectable()
export class ItemService {
  constructor(
    @InjectRepository(Item)
    private readonly items: Repository<Item>,
  ) {}

  async create(dto: CreateItemDto): Promise<ItemDto> {
    if (await this.items.exists({ where: { code: dto.code } }))
      throw new ConflictException('Item code already exists');

    const item = this.items.create({
      code: dto.code,
      name: dto.name,
      size: dto.size,
      gender: dto.gender,
      description: dto.description,
    });

    await this.items.save(item);

    return plainToInstance(ItemDto, item, {
      excludeExtraneousValues: true,
    });
  }

  async findAll(
    query: ItemQueryDto,
  ): Promise<{ data: ItemDto[]; total: number }> {
    const qb = this.items.createQueryBuilder('i');

    // search
    if (query.search) {
      qb.andWhere(`(i.code ILIKE :s OR i.name ILIKE :s)`, {
        s: `%${query.search}%`,
      });
    }

    // field filters
    if (query.code) qb.andWhere(`i.code ILIKE :c`, { c: `%${query.code}%` });

    if (query.name) qb.andWhere(`i.name ILIKE :n`, { n: `%${query.name}%` });

    if (query.gender) qb.andWhere(`i.gender = :g`, { g: query.gender });

    if (query.createdAtFrom)
      qb.andWhere(`i.createdAt >= :from`, { from: query.createdAtFrom });

    if (query.createdAtTo)
      qb.andWhere(`i.createdAt <= :to`, { to: query.createdAtTo });

    const total = await qb.getCount();

    // sorting
    qb.orderBy(`i.${query.sort ?? 'id'}`, query.order);

    // pagination
    qb.skip(query.offset).take(query.limit);

    const rows = await qb.getMany();

    return {
      data: rows.map((i) =>
        plainToInstance(ItemDto, i, {
          excludeExtraneousValues: true,
        }),
      ),
      total,
    };
  }

  async findOne(id: number): Promise<ItemDto> {
    const item = await this.items.findOne({ where: { id } });
    if (!item) throw new NotFoundException();

    return plainToInstance(ItemDto, item, {
      excludeExtraneousValues: true,
    });
  }

  async update(id: number, dto: UpdateItemDto): Promise<ItemDto> {
    const item = await this.items.findOne({ where: { id } });
    if (!item) throw new NotFoundException();

    if (dto.code && dto.code !== item.code) {
      if (await this.items.exists({ where: { code: dto.code } }))
        throw new ConflictException('Item code already exists');
      item.code = dto.code;
    }
    if (dto.name) item.name = dto.name;
    if (dto.size !== undefined) item.size = dto.size;
    if (dto.gender !== undefined) item.gender = dto.gender;
    if (dto.description !== undefined) item.description = dto.description;

    const updated = await this.items.save(item);

    return plainToInstance(ItemDto, updated, {
      excludeExtraneousValues: true,
    });
  }

  async delete(id: number): Promise<void> {
    const item = await this.items.findOne({ where: { id } });
    if (!item) throw new NotFoundException();

    await this.items.remove(item);
  }
}
