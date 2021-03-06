import { Controller, Get } from '@nestjs/common';
import { HealthCheck, HealthCheckService, HttpHealthIndicator } from '@nestjs/terminus';

@Controller('internal')
export class InternalController {
  constructor(private readonly health: HealthCheckService, private readonly http: HttpHealthIndicator) {}

  @Get('health')
  @HealthCheck()
  healthCheck() {
    const healthIndicators = [async () => this.http.pingCheck('google.com', 'https://google.com')];

    return this.health.check(healthIndicators);
  }
}
