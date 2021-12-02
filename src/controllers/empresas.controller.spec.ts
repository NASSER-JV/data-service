import { Test, TestingModule } from '@nestjs/testing';
import { EmpresasController } from '@/controllers/empresas.controller';
import { EmpresasService } from '@/services/empresas.service';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { ConfigModule } from '@nestjs/config';
import { Connection, IDatabaseDriver, MikroORM } from '@mikro-orm/core';
import { Empresa } from '@/data/entities/empresa.entity';

describe('EmpresaController', () => {
  let appController: EmpresasController;
  let appService: EmpresasService;
  let orm: MikroORM<IDatabaseDriver<Connection>>;

  beforeAll(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule.forRoot(), MikroOrmModule.forRoot()],
      controllers: [EmpresasController],
      providers: [EmpresasService],
    }).compile();

    orm = app.get<MikroORM>(MikroORM);
    appController = app.get<EmpresasController>(EmpresasController);
    appService = app.get<EmpresasService>(EmpresasService);
  });
  describe('Criar empresa teste', () => {
    it('Deve criar uma nova empresa', async () => {
      const body = {
        nome: 'Teste',
        codigo: 'TT',
        ativo: true,
      };
      const company = await appService.create(body);
      if (company instanceof Empresa) {
        expect(company.nome).toContain('Teste');
      }
    });
  });

  describe('Listar empresas', () => {
    it('Deve retornar lista de empresas e verifica se possui Teste', async () => {
      const company = await appController.getAll();
      let name = '';
      company.forEach((S) => {
        if (S.nome == 'Teste') name = S.nome;
      });
      expect(name).toContain('Teste');
    });
  });

  describe('Procura empresa Teste', () => {
    it('Deve retornar empresa Teste', async () => {
      const params = { sigla: 'TT', ativo: true };
      const company = await appController.getCompany(params);
      expect(company.nome).toContain('Teste');
    });
  });

  describe('Deletar empresa teste', () => {
    it('Deve deletar uma empresa', async () => {
      const params = { sigla: 'TT', ativo: true };
      const company = await appController.getCompany(params);
      const companyDelete = await appService.delete(company.id);
      expect(companyDelete).toContain(`Empresa: ${company.nome} removida com sucesso!`);
    });
  });

  afterAll(async () => await orm.close());
});
