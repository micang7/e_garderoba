import { NestFactory } from '@nestjs/core';
import { AppModule } from '../../app.module';
import { DataSource } from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { UserRole } from '../../common/enums/user-role.enum';
import * as bcrypt from 'bcrypt';

async function initialSeed() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const dataSource = app.get(DataSource);

  const userRepo = dataSource.getRepository(User);
  const hash = async (password: string) => bcrypt.hash(password, 12);
  await userRepo.save({
    firstName: 'Jan',
    lastName: 'Kowalski',
    email: 'jkowalski@example.com',
    phone: '123456789',
    role: UserRole.Admin,
    passwordHash: await hash('jkowalski'),
  });

  await app.close();
}

initialSeed();
