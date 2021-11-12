import { MiddlewareConsumer, Module } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';
import { HttpModule } from '@nestjs/axios';
import { InternalController } from '@/controllers/internal.controller';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { ConfigModule } from '@nestjs/config';
import { EmpresasController } from '@/controllers/empresas.controller';
import { EmpresasService } from '@/services/empresas.service';
import { AuthModule } from '@/modules/auth.module';
import { AuthMiddleware } from '@/middleware/auth.middleware';
import { NoticiasController } from '@/controllers/noticias.controller';
import { NoticiasServices } from '@/services/noticias.services';

@Module({
  imports: [AuthModule, ConfigModule.forRoot(), TerminusModule, HttpModule, MikroOrmModule.forRoot()],
  controllers: [InternalController, EmpresasController, NoticiasController],
  providers: [EmpresasService, NoticiasServices],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes('');
  }
}
