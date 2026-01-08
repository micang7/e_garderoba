import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { plainToInstance } from 'class-transformer';

import { User } from '../user/entities/user.entity';
import { UserCreateDto } from '../user/dto/create-user.dto';
import { UpdateUserDto } from '../user/dto/update-user.dto';
import { UserDto } from './dto/user.dto';

import { AlreadyExistsException } from '../common/exceptions';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly users: Repository<User>,
  ) {}

  async create(dto: UserCreateDto): Promise<UserDto> {
    if (await this.users.exists({ where: { email: dto.email } }))
      throw new AlreadyExistsException('Email already exists');

    const user = this.users.create({
      firstName: dto.firstName,
      lastName: dto.lastName,
      email: dto.email,
      phone: dto.phone,
      role: dto.role,
      passwordHash: await bcrypt.hash(dto.password, 12),
    });

    await this.users.save(user);

    return plainToInstance(UserDto, user, {
      excludeExtraneousValues: true,
    }) as UserDto;
  }

  findAll() {
    return `This action returns all user`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
