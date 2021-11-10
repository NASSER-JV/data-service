import { Module } from '@nestjs/common';
import { AppController } from '../Controllers/app.controller';
import { AppService } from '../Services/app.service';
import {TerminusModule} from "@nestjs/terminus";

@Module({
  imports: [TerminusModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
