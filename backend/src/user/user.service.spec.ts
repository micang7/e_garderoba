import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { UserService } from './user.service';
import { User } from './entities/user.entity';
import { UserRole } from '../common/enums/user-role.enum';
import { UserCreateDto } from './dto/create-user.dto';
import { UserUpdateDto } from './dto/update-user.dto';
import {
  ConflictException,
  ForbiddenException,
  NotFoundException,
} from '@nestjs/common';

jest.mock('bcrypt');

describe('UserService', () => {
  let service: UserService;
  let repository: Repository<User>;

  const user: User = {
    id: 0,
    firstName: 'Jan',
    lastName: 'Kowalski',
    email: 'jkowalski@example.com',
    phone: '123456789',
    role: UserRole.Dancer,
    createdAt: new Date(),
    passwordHash: 'haslo',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(User),
          useValue: {
            exists: jest.fn(),
            create: jest.fn(),
            save: jest.fn(),
            findOne: jest.fn(),
            remove: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    repository = module.get<Repository<User>>(getRepositoryToken(User));
    jest.clearAllMocks();
  });

  describe('create', () => {
    const dto: UserCreateDto = {
      firstName: 'Jan',
      lastName: 'Kowalski',
      email: 'jkowalski@example.com',
      phone: '123456789',
      role: UserRole.Dancer,
      password: 'haslo',
    };

    it('check if email is not in use', async () => {
      jest.spyOn(repository, 'exists').mockResolvedValue(true);

      await expect(service.create(dto)).rejects.toThrow(ConflictException);
    });

    it('hash password', async () => {
      jest.spyOn(repository, 'exists').mockResolvedValue(false);
      const createSpy = jest.spyOn(repository, 'create');
      (bcrypt.hash as jest.Mock).mockResolvedValue('hash');

      await service.create({ ...dto });

      expect(createSpy).toHaveBeenCalledWith(
        expect.objectContaining({ passwordHash: 'hash' }),
      );
    });

    it('create user if email is available', async () => {
      jest.spyOn(repository, 'exists').mockResolvedValue(false);
      jest.spyOn(repository, 'create').mockReturnValue({ ...user });

      const result = await service.create(dto);

      expect(result.email).toBe(dto.email);
    });
  });

  describe('findOne', () => {
    it('check if user exists', async () => {
      jest.spyOn(repository, 'findOne').mockResolvedValue(null);

      await expect(service.findOne(0)).rejects.toThrow(NotFoundException);
    });

    it('return user if exists', async () => {
      jest
        .spyOn(repository, 'findOne')
        .mockResolvedValue({ ...user, email: 'anowak@example.com' });

      const result = await service.findOne(0);

      expect(result.email).toBe('anowak@example.com');
    });
  });

  describe('update', () => {
    const dto: UserUpdateDto = {
      firstName: 'Adam',
      lastName: 'Nowak',
      email: 'anowak@example.com',
      phone: '987654321',
      role: UserRole.Manager,
    };

    it('check if user exists', async () => {
      jest.spyOn(repository, 'findOne').mockResolvedValue(null);

      await expect(
        service.update(0, dto, { id: 0, role: UserRole.Dancer }),
      ).rejects.toThrow(NotFoundException);
    });

    it('Dancer, Manager cannot update their own firstName, lastName or role', async () => {
      jest.spyOn(repository, 'findOne').mockResolvedValue({ ...user, id: 0 });

      await expect(
        service.update(
          0,
          { firstName: dto.firstName },
          { id: 0, role: UserRole.Dancer },
        ),
      ).rejects.toThrow(ForbiddenException);

      await expect(
        service.update(
          0,
          { lastName: dto.lastName },
          { id: 0, role: UserRole.Dancer },
        ),
      ).rejects.toThrow(ForbiddenException);

      await expect(
        service.update(
          0,
          { role: UserRole.Admin },
          { id: 0, role: UserRole.Dancer },
        ),
      ).rejects.toThrow(ForbiddenException);

      await expect(
        service.update(
          0,
          { firstName: dto.firstName },
          { id: 0, role: UserRole.Manager },
        ),
      ).rejects.toThrow(ForbiddenException);

      await expect(
        service.update(
          0,
          { lastName: dto.lastName },
          { id: 0, role: UserRole.Manager },
        ),
      ).rejects.toThrow(ForbiddenException);

      await expect(
        service.update(
          0,
          { role: UserRole.Admin },
          { id: 0, role: UserRole.Manager },
        ),
      ).rejects.toThrow(ForbiddenException);
    });

    it('Dancer, Manager cannot update other users', async () => {
      jest.spyOn(repository, 'findOne').mockResolvedValue({ ...user, id: 0 });

      await expect(
        service.update(0, dto, { id: 1, role: UserRole.Dancer }),
      ).rejects.toThrow(ForbiddenException);

      await expect(
        service.update(0, dto, { id: 1, role: UserRole.Manager }),
      ).rejects.toThrow(ForbiddenException);
    });

    it('check if updated email is not in use', async () => {
      jest.spyOn(repository, 'findOne').mockResolvedValue({ ...user, id: 0 });
      jest.spyOn(repository, 'exists').mockResolvedValue(true);

      await expect(
        service.update(
          0,
          { email: dto.email },
          { id: 0, role: UserRole.Dancer },
        ),
      ).rejects.toThrow(ConflictException);
    });

    it('Dancer, Manager can update their own email or phone', async () => {
      jest.spyOn(repository, 'findOne').mockResolvedValue({ ...user, id: 0 });
      jest.spyOn(repository, 'exists').mockResolvedValue(false);
      jest
        .spyOn(repository, 'save')
        .mockResolvedValue({ ...user, email: dto.email!, phone: dto.phone });

      const dancer = await service.update(
        0,
        { email: dto.email, phone: dto.phone },
        {
          id: 0,
          role: UserRole.Dancer,
        },
      );
      expect(dancer.email).toBe(dto.email);
      expect(dancer.phone).toBe(dto.phone);

      const manager = await service.update(
        0,
        { email: dto.email, phone: dto.phone },
        {
          id: 0,
          role: UserRole.Manager,
        },
      );
      expect(manager.email).toBe(dto.email);
      expect(manager.phone).toBe(dto.phone);
    });

    it('Admin can update any other user', async () => {
      jest.spyOn(repository, 'findOne').mockResolvedValue({ ...user, id: 0 });
      jest.spyOn(repository, 'exists').mockResolvedValue(false);
      jest
        .spyOn(repository, 'save')
        .mockResolvedValue({ ...user, firstName: dto.firstName! });

      const result = await service.update(0, dto, {
        id: 1,
        role: UserRole.Admin,
      });

      expect(result.firstName).toBe(dto.firstName);
    });
  });

  describe('delete', () => {
    it('Dancer, Manager cannot delete other user', async () => {
      await expect(
        service.delete(0, { id: 1, role: UserRole.Dancer }),
      ).rejects.toThrow(ForbiddenException);

      await expect(
        service.delete(0, { id: 1, role: UserRole.Manager }),
      ).rejects.toThrow(ForbiddenException);
    });

    it('check if user exists', async () => {
      jest.spyOn(repository, 'findOne').mockResolvedValue(null);

      await expect(
        service.delete(0, { id: 0, role: UserRole.Dancer }),
      ).rejects.toThrow(NotFoundException);
    });

    it('user can delete his own account', async () => {
      jest.spyOn(repository, 'findOne').mockResolvedValue({ ...user, id: 0 });
      const removeSpy = jest.spyOn(repository, 'remove');

      await service.delete(0, { id: 0, role: UserRole.Dancer });
      expect(removeSpy).toHaveBeenCalled();

      await service.delete(0, { id: 0, role: UserRole.Manager });
      expect(removeSpy).toHaveBeenCalled();

      await service.delete(0, { id: 0, role: UserRole.Admin });
      expect(removeSpy).toHaveBeenCalled();
    });

    it('Admin can delete other user', async () => {
      jest.spyOn(repository, 'findOne').mockResolvedValue({ ...user, id: 0 });
      const removeSpy = jest.spyOn(repository, 'remove');

      await service.delete(0, { id: 1, role: UserRole.Admin });
      expect(removeSpy).toHaveBeenCalled();
    });
  });
});
