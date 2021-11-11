import { NestFactory } from '@nestjs/core';
import {AppModule} from "@/modules/app.module.js";
import {ConfigService} from "@nestjs/config";


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get<ConfigService>(ConfigService);
  await app.listen(configService.get('API_PORT'));
}
bootstrap();
