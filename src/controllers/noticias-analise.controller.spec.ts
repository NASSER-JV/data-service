import { Test, TestingModule } from '@nestjs/testing';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { ConfigModule } from '@nestjs/config';
import { Connection, IDatabaseDriver, MikroORM } from '@mikro-orm/core';
import { EmpresasService } from '@/services/empresas.service';
import { Empresa } from '@/data/entities/empresa.entity';
import { NoticiasAnaliseController } from '@/controllers/noticias-analise.controller';
import { NoticiasAnaliseService } from '@/services/noticias-analise.service';
import { NoticiasAnalise } from '@/data/entities/noticias-analise.entity';

describe('NoticiasAnaliseController', () => {
  let appController: NoticiasAnaliseController;
  let appService: NoticiasAnaliseService;
  let empresaService: EmpresasService;
  let orm: MikroORM<IDatabaseDriver<Connection>>;

  beforeAll(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule.forRoot(), MikroOrmModule.forRoot()],
      controllers: [NoticiasAnaliseController],
      providers: [NoticiasAnaliseService, EmpresasService],
    }).compile();

    orm = app.get<MikroORM>(MikroORM);
    appController = app.get<NoticiasAnaliseController>(NoticiasAnaliseController);
    appService = app.get<NoticiasAnaliseService>(NoticiasAnaliseService);
    empresaService = app.get<EmpresasService>(EmpresasService);
  });
  describe('Criar noticia analise teste', () => {
    it('Deve criar uma nova noticia', async () => {
      let news: NoticiasAnalise | string = '';

      let empresa: Empresa | string = await empresaService.get('TT', true);
      if (empresa == null) {
        const bodyEmpresa = {
          nome: 'TesteNoticia',
          codigo: 'TT',
          ativo: true,
        };
        empresa = await empresaService.create(bodyEmpresa);
      }
      if (empresa instanceof Empresa) {
        const body = {
          url: 'teste.com',
          texto: 'teste',
          titulo: 'teste',
          sentimento: 1,
          tickers: ['TT'],
        };
        news = await appService.create(body);
      }

      if (news instanceof NoticiasAnalise) {
        expect(news.url).toContain('teste.com');
      }
    });
  });

  describe('Listar noticias analise', () => {
    it('Deve retornar lista de noticias e verifica se possui Teste', async () => {
      const news = await appController.getAll();
      let name = '';
      news.forEach((S) => {
        if (S.url == 'teste.com') name = S.url;
      });
      expect(name).toContain('teste.com');
    });
  });

  describe('Procura noticia Teste', () => {
    it('Deve retornar noticia Teste', async () => {
      const news = await appController.getNews('TT');
      let name = '';
      news.forEach((S) => {
        if (S.url == 'teste.com') name = S.url;
      });
      expect(name).toContain('teste.com');
    });
  });

  describe('Deletar noticia analise teste', () => {
    it('Deve deletar uma noticia', async () => {
      const newsDelete = await appService.delete('teste.com');
      const company = await empresaService.get('TT', true);
      await empresaService.delete(company.id);
      if (newsDelete instanceof NoticiasAnalise) expect(newsDelete.url).toContain('teste.com');
    });
  });

  afterAll(async () => await orm.close());
});
