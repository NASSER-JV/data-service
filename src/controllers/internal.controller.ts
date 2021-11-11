import { Controller, Get } from '@nestjs/common';
import {HealthCheck, HealthCheckService, HttpHealthIndicator} from "@nestjs/terminus";

@Controller()
export class InternalController {
  constructor(
      private readonly health: HealthCheckService, private readonly http: HttpHealthIndicator
  ) {}

  @Get()
  @HealthCheck()
  healthCheck() {
    const healthIndicators = [async () => await this.http.pingCheck('google.com', 'https://google.com')];

    return this.health.check(healthIndicators);
  }
}
