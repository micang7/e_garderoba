import { ConflictException, Injectable } from '@nestjs/common';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Item } from './entities/item.entity';
import { Repository } from 'typeorm';
import { ItemDto } from './dto/item.dto';
import { plainToInstance } from 'class-transformer';

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

  findAll() {
    return `This action returns all item`;
  }

  findOne(id: number) {
    return `This action returns a #${id} item`;
  }

  update(id: number, updateItemDto: UpdateItemDto) {
    return `This action updates a #${id} item`;
  }

  remove(id: number) {
    return `This action removes a #${id} item`;
  }
}
