import { NestFactory } from '@nestjs/core';
import { json, urlencoded } from 'body-parser';
import compression from 'compression';
import * as dotenv from 'dotenv';
import { AppModuleV19 } from './ms/ms.v1.9/app.module.v1.9';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModuleV19);
  app.enableCors();
  app.setGlobalPrefix('api');
  app.use(compression());
  app.use(json());
  app.use(json({ type: 'application/x-ndjson' }));
  app.use(urlencoded({ extended: true }));
  await app.listen(9000);
}
bootstrap();
