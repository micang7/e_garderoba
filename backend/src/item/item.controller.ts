import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  Query,
} from '@nestjs/common';
import { ItemService } from './item.service';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { ItemQueryDto } from './dto/item-query.dto';

@Controller('items')
export class ItemController {
  constructor(private readonly itemService: ItemService) {}

  @Post()
  @HttpCode(201)
  async create(@Body() dto: CreateItemDto) {
    const data = await this.itemService.create(dto);
    return { data };
  }

  @Get()
  async findAll(@Query() query: ItemQueryDto) {
    const { data, total } = await this.itemService.findAll(query);
    return {
      data,
      meta: { total },
    };
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    const data = await this.itemService.findOne(id);
    return { data };
  }

  @Patch(':id')
  async update(@Param('id') id: number, @Body() dto: UpdateItemDto) {
    const data = await this.itemService.update(id, dto);
    return { data };
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.itemService.remove(+id);
  }
}
