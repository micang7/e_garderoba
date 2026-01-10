import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { BadRequestException, ValidationPipe } from '@nestjs/common';
import {
  ValidationErrorCodes,
  ValidationErrorMessages,
} from './common/validation-errors';
import { GlobalExceptionFilter } from './common/exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('E-garderoba')
    .setDescription('Dokumentacja e-garderoba API')
    .setVersion('1.0')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'JWT',
        description: 'Wprowadź token JWT',
        in: 'header',
      },
      'JWT',
    )
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, documentFactory);

  app.setGlobalPrefix('/api/v1');

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      transformOptions: { enableImplicitConversion: true },
      forbidNonWhitelisted: true,
      exceptionFactory: (errors) =>
        new BadRequestException(
          errors.flatMap((err) =>
            Object.keys(err.constraints || {}).map((key) => {
              const code = ValidationErrorCodes[key] || 'UNKNOWN_ERROR';
              return {
                field: err.property,
                code,
                message: ValidationErrorMessages[code] || 'Invalid value',
              };
            }),
          ),
        ),
    }),
  );

  app.useGlobalFilters(new GlobalExceptionFilter());

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
