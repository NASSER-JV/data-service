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
import { NoticiasService } from '@/services/noticias.service';
import { JuncoesService } from '@/services/juncoes.service';
import { JuncoesController } from '@/controllers/juncoes.controller';
import { NoticiasAnaliseService } from '@/services/noticias_analise.service';
import { Noticias_analiseController } from '@/controllers/noticias_analise.controller';

@Module({
  imports: [AuthModule, ConfigModule.forRoot(), TerminusModule, HttpModule, MikroOrmModule.forRoot()],
  controllers: [InternalController, EmpresasController, NoticiasController, JuncoesController, Noticias_analiseController],
  providers: [EmpresasService, NoticiasService, JuncoesService, NoticiasAnaliseService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes('');
  }
}
