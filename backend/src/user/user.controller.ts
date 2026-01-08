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
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UserCreateDto } from '../user/dto/create-user.dto';
import { UserUpdateDto } from './dto/update-user.dto';
import { UserQueryDto } from './dto/user-query.dto';
import { UserRole } from '../common/enums/user-role.enum';
import { ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/jwt/guards/jwt-role.guard';
import { Role } from '../auth/jwt/decorators/jwt-role.decorator';
import { AuthUser } from '../auth/jwt/decorators/jwt-auth-user.decorator';
import type { JwtPayload } from '../auth/jwt/interfaces/jwt-payload.interface';

@ApiBearerAuth('JWT')
@Controller('users')
@UseGuards(JwtAuthGuard, RolesGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @HttpCode(201)
  @Role(UserRole.Admin)
  async create(@Body() dto: UserCreateDto) {
    const data = await this.userService.create(dto);
    return { data };
  }

  @Get()
  @Role(UserRole.Manager)
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
  async update(
    @Param('id') id: number,
    @Body() dto: UserUpdateDto,
    @AuthUser() authUser: JwtPayload,
  ) {
    const data = await this.userService.update(id, dto, authUser);
    return { data };
  }

  @Delete(':id')
  @HttpCode(204)
  async delete(@Param('id') id: number, @AuthUser() authUser: JwtPayload) {
    await this.userService.delete(id, authUser);
    return;
  }
}
