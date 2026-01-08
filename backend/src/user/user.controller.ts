import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  HttpCode,
  Query,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UserCreateDto } from '../user/dto/create-user.dto';
import { UserUpdateDto } from './dto/update-user.dto';
import { UserQueryDto } from './dto/user-query.dto';
import { UserRole } from 'src/common/enums/user-role.enum';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @HttpCode(201)
  async create(@Body() dto: UserCreateDto) {
    const data = await this.userService.create(dto);
    return { data };
  }

  @Get()
  async findAll(@Query() query: UserQueryDto) {
    const { data, total } = await this.userService.findAll(query);
    return {
      data,
      meta: { total },
    };
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    const data = await this.userService.findOne(id);
    return { data };
  }

  @Patch(':id')
  async update(@Param('id') id: number, @Body() dto: UserUpdateDto) {
    const data = await this.userService.update(id, dto, {
      id: 1,
      role: UserRole.Admin,
    });
    return { data };
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
