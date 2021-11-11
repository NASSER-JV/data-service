import { Module } from '@nestjs/common';
import {TerminusModule} from "@nestjs/terminus";
import {HttpModule} from "@nestjs/axios";
import {InternalController} from "@/controllers/internal.controller.js";

@Module({
  imports: [TerminusModule, HttpModule],
  controllers: [InternalController],
  providers: [],
})
export class AppModule {}
