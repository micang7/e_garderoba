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
  UseGuards,
} from '@nestjs/common';
import { ItemService } from './item.service';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { ItemQueryDto } from './dto/item-query.dto';
import { ApiBearerAuth } from '@nestjs/swagger';
import { RolesGuard } from '../auth/jwt/guards/jwt-role.guard';
import { JwtAuthGuard } from '../auth/jwt/guards/jwt-auth.guard';
import { Role } from '../auth/jwt/decorators/jwt-role.decorator';
import { UserRole } from '../common/enums/user-role.enum';

@ApiBearerAuth('JWT')
@Controller('items')
@UseGuards(JwtAuthGuard, RolesGuard)
export class ItemController {
  constructor(private readonly itemService: ItemService) {}

  @Post()
  @HttpCode(201)
  @Role(UserRole.Manager)
  async create(@Body() dto: CreateItemDto) {
    const data = await this.itemService.create(dto);
    return { data };
  }

  @Get()
  @Role(UserRole.Manager)
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
  @Role(UserRole.Manager)
  async update(@Param('id') id: number, @Body() dto: UpdateItemDto) {
    const data = await this.itemService.update(id, dto);
    return { data };
  }

  @Delete(':id')
  @HttpCode(204)
  @Role(UserRole.Manager)
  async delete(@Param('id') id: number) {
    await this.itemService.delete(id);
    return;
  }
}
