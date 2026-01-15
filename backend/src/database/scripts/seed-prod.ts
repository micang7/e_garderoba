import { NestFactory } from '@nestjs/core';
import { AppModule } from '../../app.module';
import { DataSource } from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { UserRole } from '../../common/enums/user-role.enum';
import * as bcrypt from 'bcrypt';

async function seedProd() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const ds = app.get(DataSource);
  const users = ds.getRepository(User);

  const email = 'jkowalski@example.com';
  const exists = await users.exists({ where: { email } });

  if (!exists) {
    await users.save({
      firstName: 'Jan',
      lastName: 'Kowalski',
      email,
      phone: '123456789',
      role: UserRole.Admin,
      passwordHash: await bcrypt.hash('jkowalski', 12),
    });
  }

  await app.close();
}
seedProd();
