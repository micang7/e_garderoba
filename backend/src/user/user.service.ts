import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { plainToInstance } from 'class-transformer';

import { User } from '../user/entities/user.entity';
import { UserCreateDto } from '../user/dto/create-user.dto';
import { UserUpdateDto } from '../user/dto/update-user.dto';
import { UserQueryDto } from './dto/user-query.dto';
import { UserDto } from './dto/user.dto';
import { UserRole } from '../common/enums/user-role.enum';

import {
  AlreadyExistsException,
  NotFoundException,
  NoPermissionException,
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
    });
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
      data: rows.map((u) =>
        plainToInstance(UserDto, u, {
          excludeExtraneousValues: true,
        }),
      ),
      total,
    };
  }

  async findOne(id: number): Promise<UserDto> {
    const user = await this.users.findOne({ where: { id } });
    if (!user) throw new NotFoundException();

    return plainToInstance(UserDto, user, {
      excludeExtraneousValues: true,
    });
  }

  async update(
    id: number,
    dto: UserUpdateDto,
    authUser: { id: number; role: UserRole },
  ): Promise<UserDto> {
    const user = await this.users.findOne({ where: { id } });
    if (!user) throw new NotFoundException();

    // permissions
    // tancerz, kierownik mogą edytować tylko własne email i telefon
    if (authUser.id === user.id) {
      if (
        (authUser.role === UserRole.Dancer ||
          authUser.role === UserRole.Manager) &&
        ((dto.firstName && dto.firstName !== user.firstName) ||
          (dto.lastName && dto.lastName !== user.lastName) ||
          (dto.role && dto.role !== user.role))
      ) {
        throw new NoPermissionException();
      }
    } else if (authUser.role !== UserRole.Admin) {
      throw new NoPermissionException();
    }

    if (dto.email && dto.email !== user.email) {
      if (await this.users.exists({ where: { email: dto.email } }))
        throw new AlreadyExistsException('Email already exists');
      user.email = dto.email;
    }

    if (dto.firstName) user.firstName = dto.firstName;
    if (dto.lastName) user.lastName = dto.lastName;
    if (dto.phone) user.phone = dto.phone;
    if (dto.role) user.role = dto.role;

    await this.users.save(user);

    return plainToInstance(UserDto, user, {
      excludeExtraneousValues: true,
    });
  }

  async delete(
    id: number,
    authUser: { id: number; role: UserRole },
  ): Promise<void> {
    // permissions
    // user może usunąć tylko samego siebie, chyba że jest adminem
    if (authUser.id !== id && authUser.role !== UserRole.Admin)
      throw new NoPermissionException();

    const user = await this.users.findOne({ where: { id } });
    if (!user) throw new NotFoundException();

    await this.users.remove(user);
  }
}
