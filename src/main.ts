import { NestFactory } from '@nestjs/core';
import { AppModule } from '@/modules/app.module';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  await app.listen(process.env.PORT);
}
bootstrap()
  .then(() => Logger.log(`App running on port ${process.env.PORT}`))
  .catch((e) => Logger.error(`Error starting the application \n${e}`));
