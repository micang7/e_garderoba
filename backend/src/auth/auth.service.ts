import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { plainToInstance } from 'class-transformer';
import { UserDto } from '../user/dto/user.dto';
import { User } from '../user/entities/user.entity';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    @InjectRepository(User)
    private readonly users: Repository<User>,
  ) {}

  async login(dto: LoginDto): Promise<{ user: UserDto; token: string }> {
    const user = await this.users.findOne({ where: { email: dto.email } });
    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const isPasswordMatching = await bcrypt.compare(
      dto.password,
      user.passwordHash,
    );
    if (!isPasswordMatching) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const token = this.jwtService.sign({
      id: user.id,
      email: user.email,
      role: user.role,
    });

    const userDto = plainToInstance(UserDto, user, {
      excludeExtraneousValues: true,
    });

    return { user: userDto, token };
  }
}
