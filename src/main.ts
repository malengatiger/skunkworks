import { NestFactory } from '@nestjs/core';
import { ValidationPipe, ValidationError } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

import AppModule from '@/app.module';

import ValidationExceptions from '@/exceptions/validation.exceptions';

import {
  BadRequestExceptionFilter,
  UnauthorizedExceptionFilter,
  ForbiddenExceptionFilter,
  ValidationExceptionsFilter,
  NotFoundExceptionFilter,
  AllExceptionsFilter,
} from '@/filters';

const mm = '😎😎😎😎😎 NestJS Postgres Sandbox 😎';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  console.log(`${mm} bootstrap started .....`);
  app.enableCors();
  app.useGlobalPipes(
    new ValidationPipe({
      exceptionFactory: (errors: ValidationError[]) =>
        new ValidationExceptions(errors),
    }),
  );

  app.useGlobalFilters(
    new AllExceptionsFilter(),
    new UnauthorizedExceptionFilter(),
    new ForbiddenExceptionFilter(),
    new BadRequestExceptionFilter(),
    new NotFoundExceptionFilter(),
    new ValidationExceptionsFilter(),
  );

  // const configService = app.get(ApiConfigService);
  // const port = configService.getNumber('SERVER_PORT', 3000);
  const port = process.env.SERVER_PORT || 3012;
  const options = new DocumentBuilder()
    .setTitle('Api v1')
    .setDescription('The boilerplate API for nestjs devs')
    .setVersion('1.0')
    .addBearerAuth({ in: 'header', type: 'http' })
    .build();
  const document = SwaggerModule.createDocument(app, options);

  SwaggerModule.setup('api', app, document);
  console.log(
    `${mm} ... The server is starting on port: ${port}, url: http://localhost:${port}/api .....`,
  );

  await app.listen(port, async () => {
    console.log(
      `${mm} The server is running on ${port} url: http://localhost:${port}/api`,
    );
  });
}

bootstrap();
