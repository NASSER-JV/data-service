import { Controller, Get } from '@nestjs/common';
import {HealthCheck, HealthCheckService} from "@nestjs/terminus";

@Controller()
export class AppController {
  constructor(
      private health: HealthCheckService,
  ) {}

  @Get()
  @HealthCheck()
  check() {
    return this.health.check([]);
  }
}
