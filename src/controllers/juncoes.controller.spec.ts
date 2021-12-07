import { Test, TestingModule } from '@nestjs/testing';
import { EmpresasService } from '@/services/empresas.service';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { ConfigModule } from '@nestjs/config';
import { Connection, IDatabaseDriver, MikroORM } from '@mikro-orm/core';
import { Empresa } from '@/data/entities/empresa.entity';
import { JuncoesController } from '@/controllers/juncoes.controller';
import { JuncoesService } from '@/services/juncoes.service';
import { Juncao } from '@/data/entities/juncoes.entity';
import { BuscarEmpresaQuery } from '@/dtos/buscar-empresa.query';
import { CriarJuncaoRequest } from '@/dtos/criar-juncao.request';

describe('JuncaoController', () => {
  let appController: JuncoesController;
  let appService: JuncoesService;
  let empresaService: EmpresasService;
  let orm: MikroORM<IDatabaseDriver<Connection>>;

  beforeAll(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule.forRoot(), MikroOrmModule.forRoot()],
      controllers: [JuncoesController],
      providers: [EmpresasService, JuncoesService],
    }).compile();

    orm = app.get<MikroORM>(MikroORM);
    appController = app.get<JuncoesController>(JuncoesController);
    appService = app.get<JuncoesService>(JuncoesService);
    empresaService = app.get<EmpresasService>(EmpresasService);
  });
  describe('Criar juncao teste', () => {
    it('Deve criar uma nova juncao', async () => {
      const query: BuscarEmpresaQuery = {
        sigla: 'TT',
        ativo: true,
      };
      let empresa: Empresa | string = await empresaService.get(query);
      let juncao: Juncao | string;
      if (empresa == null) {
        const bodyEmpresa = {
          nome: 'TesteJuncao',
          codigo: 'TT',
          ativo: true,
        };
        empresa = await empresaService.create(bodyEmpresa);
      }
      if (empresa instanceof Empresa) {
        const body: CriarJuncaoRequest = {
          dataInicio: '2021-11-12',
          dataFim: '2021-12-03',
          empresa_id: empresa.id,
        };
        juncao = await appService.create(body);
      }
      if (juncao instanceof Juncao && empresa instanceof Empresa) {
        const empresaIdJuncao = juncao.empresa.id.toString();
        const empresaId = empresa.id.toString();
        expect(empresaIdJuncao).toContain(empresaId);
      }
    });
  });

  describe('Listar juncoes', () => {
    it('Deve retornar lista de juncoes e verifica se possui Teste', async () => {
      const query: BuscarEmpresaQuery = {
        sigla: 'TT',
        ativo: true,
      };
      const empresa = await empresaService.get(query);
      const juncoes = await appController.getAll();
      let idEmpresa = 0;
      juncoes.forEach((j) => {
        if (j.empresa.id == empresa.id) {
          idEmpresa = j.empresa.id;
        }
      });
      expect(empresa.id).toEqual(idEmpresa);
    });
  });

  describe('Procura juncao Teste', () => {
    it('Deve retornar juncao Teste', async () => {
      const juncoes = await appController.getAll();
      const query: BuscarEmpresaQuery = {
        sigla: 'TT',
        ativo: true,
      };
      const empresa = await empresaService.get(query);
      let idEmpresa = 0;
      juncoes.forEach((j) => {
        if (j.empresa.id == empresa.id) {
          idEmpresa = j.empresa.id;
        }
      });
      expect(empresa.id).toEqual(idEmpresa);
    });
  });

  describe('Deletar juncao teste', () => {
    it('Deve deletar uma juncao', async () => {
      const juncoes = await appController.getAll();
      const query: BuscarEmpresaQuery = {
        sigla: 'TT',
        ativo: true,
      };
      const empresa = await empresaService.get(query);
      let idJuncao = 0;
      juncoes.forEach((j) => {
        if (j.empresa.id == empresa.id) {
          idJuncao = j.id;
        }
      });
      const juncaoDelete = await appService.delete(idJuncao);
      await empresaService.delete(empresa.id);
      expect(juncaoDelete).toContain(`Junção foi removida com sucesso!`);
    });
  });

  afterAll(async () => await orm.close());
});
