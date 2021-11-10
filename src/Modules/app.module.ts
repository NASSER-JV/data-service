import { Module } from '@nestjs/common';
import { AppController } from '../Controllers/app.controller';
import { AppService } from '../Services/app.service';
import { ConfigModule } from "@nestjs/config";
import {TerminusModule} from "@nestjs/terminus";

@Module({
  imports: [ConfigModule.forRoot(), TerminusModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
