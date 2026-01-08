import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { UserService } from './user.service';
import { User } from '../user/entities/user.entity';
import { UserRole } from '../common/enums/user-role.enum';
import {
  AlreadyExistsException,
  NotFoundException,
  NoPermissionException,
} from '../common/exceptions';
import { UserCreateDto } from './dto/create-user.dto';

// Mockowanie bcrypt, aby testy były szybkie
jest.mock('bcrypt');

describe('UserService', () => {
  let service: UserService;
  let repository: Repository<User>;

  const mockUser = {
    id: 1,
    firstName: 'Jan',
    lastName: 'Kowalski',
    email: 'jan@test.pl',
    phone: '123456789',
    role: UserRole.Dancer,
    passwordHash: 'hashed_password',
  } as User;

  // Mock dla QueryBuilder (potrzebny do findAll)
  const mockQueryBuilder = {
    andWhere: jest.fn().mockReturnThis(),
    orderBy: jest.fn().mockReturnThis(),
    skip: jest.fn().mockReturnThis(),
    take: jest.fn().mockReturnThis(),
    getCount: jest.fn().mockResolvedValue(1),
    getMany: jest.fn().mockResolvedValue([mockUser]),
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
            createQueryBuilder: jest.fn(() => mockQueryBuilder),
          },
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    repository = module.get<Repository<User>>(getRepositoryToken(User));
    jest.clearAllMocks();
  });

  // --- TESTY METODY CREATE ---
  describe('create', () => {
    it('powinien stworzyć użytkownika, jeśli email jest wolny', async () => {
      const dto = {
        email: 'new@test.pl',
        password: 'password123',
        firstName: 'A',
        lastName: 'B',
        phone: '1',
        role: UserRole.Dancer,
      };

      jest.spyOn(repository, 'exists').mockResolvedValue(false);
      jest.spyOn(repository, 'create').mockReturnValue(mockUser);
      jest.spyOn(repository, 'save').mockResolvedValue(mockUser);
      (bcrypt.hash as jest.Mock).mockResolvedValue('hashed_pw');

      const result = await service.create(dto);

      expect(
        jest.spyOn(repository, 'exists').mockResolvedValue(false),
      ).toHaveBeenCalled();
      expect(
        jest.spyOn(repository, 'exists').mockResolvedValue(false),
      ).toHaveBeenCalled();
      expect(result.email).toBe(mockUser.email);
    });

    it('powinien rzucić AlreadyExistsException, gdy email zajęty', async () => {
      jest.spyOn(repository, 'exists').mockResolvedValue(true);
      await expect(
        service.create({ email: 'exists@test.pl' } as UserCreateDto),
      ).rejects.toThrow(AlreadyExistsException);
    });
  });

  // --- TESTY METODY FINDALL ---
  describe('findAll', () => {
    it('powinien zwrócić listę użytkowników i total', async () => {
      const result = await service.findAll({
        search: 'Jan',
        limit: 10,
        offset: 0,
      });

      expect(mockQueryBuilder.andWhere).toHaveBeenCalled();
      expect(result.data).toHaveLength(1);
      expect(result.total).toBe(1);
    });
  });

  // --- TESTY METODY UPDATE ---
  describe('update', () => {
    it('powinien pozwolić adminowi edytować dowolnego użytkownika', async () => {
      const authUser = { id: 99, role: UserRole.Admin };
      const dto = { firstName: 'Zmienione' };

      jest.spyOn(repository, 'findOne').mockResolvedValue({ ...mockUser });
      jest
        .spyOn(repository, 'save')
        .mockResolvedValue({ ...mockUser, ...dto } as User);

      const result = await service.update(1, dto, authUser);
      expect(result.firstName).toBe('Zmienione');
    });

    it('powinien rzucić NoPermissionException, gdy Dancer próbuje edytować cudze konto', async () => {
      const authUser = { id: 2, role: UserRole.Dancer }; // Inne ID niż w mockUser (id:1)
      jest.spyOn(repository, 'findOne').mockResolvedValue(mockUser);

      await expect(service.update(1, {}, authUser)).rejects.toThrow(
        NoPermissionException,
      );
    });

    it('powinien rzucić NoPermissionException, gdy Dancer próbuje zmienić swoje nazwisko', async () => {
      const authUser = { id: 1, role: UserRole.Dancer };
      const dto = { lastName: 'NoweNazwisko' };
      jest.spyOn(repository, 'findOne').mockResolvedValue(mockUser);

      await expect(service.update(1, dto, authUser)).rejects.toThrow(
        NoPermissionException,
      );
    });

    it('powinien pozwolić Dancerowi zmienić swój email (jeśli wolny)', async () => {
      const authUser = { id: 1, role: UserRole.Dancer };
      const dto = { email: 'new-email@test.pl' };

      jest.spyOn(repository, 'findOne').mockResolvedValue({ ...mockUser });
      jest.spyOn(repository, 'exists').mockResolvedValue(false);

      await service.update(1, dto, authUser);
      expect(jest.spyOn(repository, 'save')).toHaveBeenCalled();
    });
  });

  // --- TESTY METODY DELETE ---
  describe('delete', () => {
    it('powinien pozwolić użytkownikowi usunąć samego siebie', async () => {
      const authUser = { id: 1, role: UserRole.Dancer };
      jest.spyOn(repository, 'findOne').mockResolvedValue(mockUser);

      await service.delete(1, authUser);
      expect(jest.spyOn(repository, 'remove')).toHaveBeenCalledWith(mockUser);
    });

    it('powinien rzucić NoPermissionException, gdy nie-admin usuwa kogoś innego', async () => {
      const authUser = { id: 2, role: UserRole.Dancer };
      await expect(service.delete(1, authUser)).rejects.toThrow(
        NoPermissionException,
      );
    });

    it('powinien rzucić NotFoundException, gdy użytkownik nie istnieje', async () => {
      const authUser = { id: 1, role: UserRole.Admin };
      jest.spyOn(repository, 'findOne').mockResolvedValue(null);

      await expect(service.delete(1, authUser)).rejects.toThrow(
        NotFoundException,
      );
    });
  });
});
