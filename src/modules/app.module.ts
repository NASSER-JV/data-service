import { Module } from '@nestjs/common';
import {TerminusModule} from "@nestjs/terminus";
import {HttpModule} from "@nestjs/axios";
import {MikroOrmModule} from "@mikro-orm/nestjs";
import {InternalController} from "@/controllers/internal.controller";
import {ConfigModule, ConfigService} from "@nestjs/config";

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), TerminusModule, HttpModule, MikroOrmModule.forRootAsync({
    inject: [ConfigService],
    useFactory: (configService: ConfigService) => ({
      entities: ['./dist/src/entities'],
      entitiesTs: ['./src/entities'],
      dbName: configService.get('DB_NAME'),
      password: configService.get('DB_PASS'),
      user: configService.get('DB_USER'),
      type: 'postgresql',
    })
  }),],
  controllers: [InternalController],
  providers: [],
})
export class AppModule {}
