import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { plainToInstance } from 'class-transformer';

import { User } from '../user/entities/user.entity';
import { UserCreateDto } from '../user/dto/create-user.dto';
import { UpdateUserDto } from '../user/dto/update-user.dto';
import { UserQueryDto } from './dto/user-query.dto';
import { UserDto } from './dto/user.dto';

import {
  AlreadyExistsException,
  NotFoundException,
} from '../common/exceptions';

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

  async findAll(
    query: UserQueryDto,
  ): Promise<{ data: UserDto[]; total: number }> {
    const qb = this.users.createQueryBuilder('u');

    // search
    if (query.search) {
      qb.andWhere(
        `(u.firstName ILIKE :s OR u.lastName ILIKE :s OR u.email ILIKE :s)`,
        { s: `%${query.search}%` },
      );
    }

    // field filters
    if (query.firstName)
      qb.andWhere(`u.firstName ILIKE :fn`, { fn: `%${query.firstName}%` });

    if (query.lastName)
      qb.andWhere(`u.lastName ILIKE :ln`, { ln: `%${query.lastName}%` });

    if (query.email)
      qb.andWhere(`u.email ILIKE :em`, { em: `%${query.email}%` });

    if (query.role) qb.andWhere(`u.role = :role`, { role: query.role });

    if (query.createdFrom)
      qb.andWhere(`u.createdAt >= :from`, { from: query.createdFrom });

    if (query.createdTo)
      qb.andWhere(`u.createdAt <= :to`, { to: query.createdTo });

    const total = await qb.getCount();

    // sorting
    if (query.sort) {
      const sortMap: Record<string, string> = {
        'first-name': 'u.firstName',
        'last-name': 'u.lastName',
        email: 'u.email',
        'created-at': 'u.createdAt',
      };
      const sortField = sortMap[query.sort] ?? 'u.id';
      const order = query.order === 'desc' ? 'DESC' : 'ASC';
      qb.orderBy(sortField, order);
    }

    // pagination
    qb.skip(query.offset ?? 0).take(query.limit ?? 20);

    const rows = await qb.getMany();

    return {
      data: rows.map(
        (u) =>
          plainToInstance(UserDto, u, {
            excludeExtraneousValues: true,
          }) as UserDto,
      ),
      total,
    };
  }

  async findOne(id: number): Promise<UserDto> {
    const user = await this.users.findOne({ where: { id } });
    if (!user) throw new NotFoundException();

    return plainToInstance(UserDto, user, {
      excludeExtraneousValues: true,
    }) as UserDto;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
