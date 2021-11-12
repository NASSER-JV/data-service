import { Module } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';
import { HttpModule } from '@nestjs/axios';
import { InternalController } from '@/controllers/internal.controller';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { ConfigModule } from '@nestjs/config';
import { EmpresasController } from '@/controllers/empresas.controller';
import { EmpresasService } from '@/services/empresas.service';

@Module({
  imports: [ConfigModule.forRoot(), TerminusModule, HttpModule, MikroOrmModule.forRoot()],
  controllers: [InternalController, EmpresasController],
  providers: [EmpresasService],
})
export class AppModule {}
