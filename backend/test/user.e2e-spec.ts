import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from '../src/app.module';
import { JwtService } from '@nestjs/jwt';
import { UserRole } from '../src/common/enums/user-role.enum';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../src/user/entities/user.entity';
import { Repository } from 'typeorm';
import { UserCreateDto } from '../src/user/dto/create-user.dto';
import { App } from 'supertest/types';
import { UserDto } from '../src/user/dto/user.dto';

describe('UserController (e2e)', () => {
  let app: INestApplication<App>;
  let jwtService: JwtService;
  let userRepo: Repository<User>;

  let dancerToken: string;
  let managerToken: string;
  let adminToken: string;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        transform: true,
        transformOptions: { enableImplicitConversion: true },
        forbidNonWhitelisted: true,
      }),
    );
    await app.init();

    jwtService = moduleFixture.get(JwtService);
    userRepo = moduleFixture.get(getRepositoryToken(User));

    await userRepo.save([
      {
        id: 1,
        firstName: 'Piotr',
        lastName: 'Zieliński',
        email: 'pzielinski@example.com',
        phone: '601234567',
        role: UserRole.Dancer,
        createdAt: new Date('01.01.2025'),
        passwordHash: 'x',
      },
      {
        id: 2,
        firstName: 'Mateusz',
        lastName: 'Woźniak',
        email: 'mwozniak@example.com',
        role: UserRole.Manager,
        createdAt: new Date('05.05.2025'),
        passwordHash: 'x',
      },
      {
        id: 3,
        firstName: 'Michał',
        lastName: 'Mazur',
        email: 'mmazur@example.com',
        phone: '703456789',
        role: UserRole.Admin,
        createdAt: new Date('12.12.2025'),
        passwordHash: 'x',
      },
    ]);

    dancerToken = jwtService.sign({
      id: 1,
      email: 'pzielinski@example.com',
      role: UserRole.Dancer,
    });

    managerToken = jwtService.sign({
      id: 2,
      email: 'mwozniak@example.com',
      role: UserRole.Manager,
    });

    adminToken = jwtService.sign({
      id: 3,
      email: 'mmazur@example.com',
      role: UserRole.Admin,
    });
  });

  afterAll(async () => {
    await app.close();
  });

  describe('GET /users', () => {
    it('Dancer cannot get users list', async () => {
      await request(app.getHttpServer())
        .get('/users')
        .set('Authorization', `Bearer ${dancerToken}`)
        .expect(403);
    });

    it('Manager, Admin can get users list', async () => {
      const res1 = await request(app.getHttpServer())
        .get('/users')
        .set('Authorization', `Bearer ${managerToken}`)
        .expect(200);

      expect(res1.body.data[0].id).toBe(1);
      expect(res1.body.data.length).toBe(3);
      expect(res1.body.meta.total).toBe(3);

      const res2 = await request(app.getHttpServer())
        .get('/users')
        .set('Authorization', `Bearer ${adminToken}`)
        .expect(200);

      expect(res2.body.data[0].id).toBe(1);
      expect(res2.body.data.length).toBe(3);
      expect(res2.body.meta.total).toBe(3);
    });

    it('returns paginated results (offset + limit)', async () => {
      const res = await request(app.getHttpServer())
        .get('/users?offset=1&limit=1')
        .set('Authorization', `Bearer ${adminToken}`)
        .expect(200);

      expect(res.body.data.length).toBe(1);
      expect(res.body.meta.total).toBe(3);
    });

    it('sorts by firstName ASC', async () => {
      const res = await request(app.getHttpServer())
        .get('/users?sort=first-name&order=asc')
        .set('Authorization', `Bearer ${adminToken}`)
        .expect(200);

      const names = res.body.data.map((u: UserDto) => u.firstName);
      expect(names).toEqual([...names].sort());
    });

    it('sorts by lastName DESC', async () => {
      const res = await request(app.getHttpServer())
        .get('/users?sort=last-name&order=desc')
        .set('Authorization', `Bearer ${adminToken}`)
        .expect(200);

      const names = res.body.data.map((u: UserDto) => u.lastName);
      expect(names).toEqual([...names].sort().reverse());
    });

    it('filters by search (case-insensitive)', async () => {
      const res = await request(app.getHttpServer())
        .get('/users?search=ziel')
        .set('Authorization', `Bearer ${adminToken}`)
        .expect(200);

      expect(res.body.data.length).toBe(1);
      expect(res.body.data[0].email).toBe('pzielinski@example.com');
    });

    it('filters by firstName', async () => {
      const res = await request(app.getHttpServer())
        .get('/users?firstName=Mate')
        .set('Authorization', `Bearer ${adminToken}`)
        .expect(200);

      expect(res.body.data.length).toBe(1);
      expect(res.body.data[0].firstName).toBe('Mateusz');
    });

    it('filters by lastName', async () => {
      const res = await request(app.getHttpServer())
        .get('/users?lastName=Maz')
        .set('Authorization', `Bearer ${adminToken}`)
        .expect(200);

      expect(res.body.data.length).toBe(1);
      expect(res.body.data[0].lastName).toBe('Mazur');
    });

    it('filters by email', async () => {
      const res = await request(app.getHttpServer())
        .get('/users?email=mwozniak')
        .set('Authorization', `Bearer ${adminToken}`)
        .expect(200);

      expect(res.body.data.length).toBe(1);
      expect(res.body.data[0].email).toBe('mwozniak@example.com');
    });

    it('filters by role', async () => {
      const res = await request(app.getHttpServer())
        .get('/users?role=kierownik')
        .set('Authorization', `Bearer ${adminToken}`)
        .expect(200);

      expect(res.body.data.length).toBe(1);
      expect(res.body.data[0].role).toBe(UserRole.Manager);
    });

    it('filters by createdFrom and createdTo', async () => {
      const res = await request(app.getHttpServer())
        .get('/users?createdFrom=2025-06-06&createdTo=2026-01-01')
        .set('Authorization', `Bearer ${adminToken}`)
        .expect(200);

      expect(res.body.data.length).toBe(1);
    });
  });

  describe('POST /users', () => {
    const dto: UserCreateDto = {
      firstName: 'Jan',
      lastName: 'Kowalski',
      email: 'jkowalski@example.com',
      phone: '123456789',
      role: UserRole.Dancer,
      password: 'haslo',
    };

    it('Dancer, Manager cannot create user', async () => {
      await request(app.getHttpServer())
        .post('/users')
        .set('Authorization', `Bearer ${dancerToken}`)
        .send(dto)
        .expect(403);

      await request(app.getHttpServer())
        .post('/users')
        .set('Authorization', `Bearer ${managerToken}`)
        .send(dto)
        .expect(403);
    });

    it('Admin can create user', async () => {
      const saveSpy = jest.spyOn(userRepo, 'save');

      const res = await request(app.getHttpServer())
        .post('/users')
        .set('Authorization', `Bearer ${adminToken}`)
        .send(dto)
        .expect(201);

      expect(res.body.data.id).toBe(4);
      expect(saveSpy).toHaveBeenCalled();
    });
  });

  describe('GET /users/:id', () => {
    it('return user', async () => {
      const res = await request(app.getHttpServer())
        .get('/users/1')
        .set('Authorization', `Bearer ${dancerToken}`)
        .expect(200);

      expect(res.body.data.id).toBe(1);
    });
  });

  describe('PATCH /users/:id', () => {
    it('update user', async () => {
      const res = await request(app.getHttpServer())
        .patch('/users/1')
        .set('Authorization', `Bearer ${adminToken}`)
        .send({ firstName: 'Adam' })
        .expect(200);

      expect(res.body.data.firstName).toBe('Adam');
    });
  });

  describe('DELETE /users/:id', () => {
    it('delete user', async () => {
      const removeSpy = jest.spyOn(userRepo, 'remove');

      await request(app.getHttpServer())
        .delete('/users/2')
        .set('Authorization', `Bearer ${adminToken}`)
        .expect(204);

      expect(removeSpy).toHaveBeenCalled();
    });
  });
});
