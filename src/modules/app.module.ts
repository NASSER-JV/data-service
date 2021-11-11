import { Module } from '@nestjs/common';
import { InternalController } from '../controllers/internal.controller.js';
import {TerminusModule} from "@nestjs/terminus";
import {HttpModule} from "@nestjs/axios";

@Module({
  imports: [TerminusModule, HttpModule],
  controllers: [InternalController],
  providers: [],
})
export class AppModule {}
