import { NestFactory } from '@nestjs/core';
import { AppModule } from '../../app.module';
import { DataSource, DeepPartial } from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { UserRole } from '../../common/enums/user-role.enum';
import * as bcrypt from 'bcrypt';

async function resetAndTestSeedDatabase() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const dataSource = app.get(DataSource);

  for (const entity of dataSource.entityMetadatas) {
    const tableName = `"${entity.tableName}"`;
    await dataSource.query(
      `TRUNCATE TABLE ${tableName} RESTART IDENTITY CASCADE`,
    );
  }

  const userRepo = dataSource.getRepository(User);
  const hash = async (password: string) => bcrypt.hash(password, 12);

  const users: DeepPartial<User>[] = [
    {
      firstName: 'Jan',
      lastName: 'Kowalski',
      email: 'jkowalski@example.com',
      phone: '123456789',
      role: UserRole.Admin,
      passwordHash: await hash('jkowalski'),
    },
    {
      firstName: 'Adam',
      lastName: 'Nowak',
      email: 'anowak@example.com',
      phone: '723853971',
      role: UserRole.Manager,
      passwordHash: await hash('anowak'),
    },
    {
      firstName: 'Piotr',
      lastName: 'Zieliński',
      email: 'pzielinski@example.com',
      phone: '601234567',
      role: UserRole.Manager,
      passwordHash: await hash('pzielinski'),
    },
    {
      firstName: 'Mateusz',
      lastName: 'Woźniak',
      email: 'mwozniak@example.com',
      role: UserRole.Manager,
      passwordHash: await hash('mwozniak'),
    },
    {
      firstName: 'Łukasz',
      lastName: 'Jodłowski',
      email: 'ljodlowski@example.com',
      phone: '502345678',
      role: UserRole.Dancer,
      passwordHash: await hash('ljodlowski'),
    },
    {
      firstName: 'Kamil',
      lastName: 'Lewandowski',
      email: 'klewandowski@example.com',
      role: UserRole.Dancer,
      passwordHash: await hash('klewandowski'),
    },
    {
      firstName: 'Michał',
      lastName: 'Mazur',
      email: 'mmazur@example.com',
      phone: '703456789',
      role: UserRole.Dancer,
      passwordHash: await hash('mmazur'),
    },
    {
      firstName: 'Jakub',
      lastName: 'Krawczyk',
      email: 'jkrawczyk@example.com',
      role: UserRole.Dancer,
      passwordHash: await hash('jkrawczyk'),
    },
    {
      firstName: 'Tomasz',
      lastName: 'Kaczmarek',
      email: 'tkaczmarek@example.com',
      phone: '804567890',
      role: UserRole.Dancer,
      passwordHash: await hash('tkaczmarek'),
    },
    {
      firstName: 'Bartosz',
      lastName: 'Grabowski',
      email: 'bgrabowski@example.com',
      role: UserRole.Dancer,
      passwordHash: await hash('bgrabowski'),
    },
    {
      firstName: 'Robert',
      lastName: 'Szymański',
      email: 'rszymanski@example.com',
      phone: '905678901',
      role: UserRole.Dancer,
      passwordHash: await hash('rszymanski'),
    },
    {
      firstName: 'Adrian',
      lastName: 'Dąbrowski',
      email: 'adabrowski@example.com',
      role: UserRole.Dancer,
      passwordHash: await hash('adabrowski'),
    },
    {
      firstName: 'Sebastian',
      lastName: 'Kozłowski',
      email: 'skozlowski@example.com',
      phone: '512678123',
      role: UserRole.Dancer,
      passwordHash: await hash('skozlowski'),
    },
    {
      firstName: 'Marcin',
      lastName: 'Jankowski',
      email: 'mjankowski@example.com',
      role: UserRole.Dancer,
      passwordHash: await hash('mjankowski'),
    },
    {
      firstName: 'Anna',
      lastName: 'Wiśniewska',
      email: 'awisniewska@example.com',
      phone: '603112233',
      role: UserRole.Dancer,
      passwordHash: await hash('awisniewska'),
    },
    {
      firstName: 'Katarzyna',
      lastName: 'Wójcik',
      email: 'kwojcik@example.com',
      role: UserRole.Dancer,
      passwordHash: await hash('kwojcik'),
    },
    {
      firstName: 'Maria',
      lastName: 'Kamińska',
      email: 'mkaminska@example.com',
      phone: '704223344',
      role: UserRole.Dancer,
      passwordHash: await hash('mkaminska'),
    },
    {
      firstName: 'Małgorzata',
      lastName: 'Włodarczyk',
      email: 'mwlodarczyk@example.com',
      role: UserRole.Dancer,
      passwordHash: await hash('mwlodarczyk'),
    },
    {
      firstName: 'Agnieszka',
      lastName: 'Chmielewska',
      email: 'achmielewska@example.com',
      phone: '805334455',
      role: UserRole.Dancer,
      passwordHash: await hash('achmielewska'),
    },
    {
      firstName: 'Magdalena',
      lastName: 'Borkowska',
      email: 'mborkowska@example.com',
      role: UserRole.Dancer,
      passwordHash: await hash('mborkowska'),
    },
    {
      firstName: 'Natalia',
      lastName: 'Szczepańska',
      email: 'nszczepanska@example.com',
      phone: '506445566',
      role: UserRole.Dancer,
      passwordHash: await hash('nszczepanska'),
    },
    {
      firstName: 'Zofia',
      lastName: 'Lis',
      email: 'zlis@example.com',
      role: UserRole.Dancer,
      passwordHash: await hash('zlis'),
    },
    {
      firstName: 'Karolina',
      lastName: 'Duda',
      email: 'kduda@example.com',
      phone: '607556677',
      role: UserRole.Dancer,
      passwordHash: await hash('kduda'),
    },
    {
      firstName: 'Aleksandra',
      lastName: 'Pietrzak',
      email: 'apietrzak@example.com',
      role: UserRole.Dancer,
      passwordHash: await hash('apietrzak'),
    },
  ];
  await userRepo.save(users);

  await app.close();
}

resetAndTestSeedDatabase();
