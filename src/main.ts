import { NestFactory } from '@nestjs/core';
import {ConfigService} from "@nestjs/config";
import { AppModule } from '@/modules/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get<ConfigService>(ConfigService);
  await app.listen(configService.get('API_PORT'));
}
bootstrap();
