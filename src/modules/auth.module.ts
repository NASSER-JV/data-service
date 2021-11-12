import { Module } from '@nestjs/common';
import { AuthService } from '@/services/auth.service';
import { PassportModule } from '@nestjs/passport';
import { ApiKeyStrategy } from '@/auth/apiKey.strategy';
@Module({
  imports: [PassportModule],
  providers: [AuthService, ApiKeyStrategy],
})
export class AuthModule {}
