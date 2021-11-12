import { Test, TestingModule } from '@nestjs/testing';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { ConfigModule } from '@nestjs/config';
import { Connection, IDatabaseDriver, MikroORM } from '@mikro-orm/core';
import { NoticiasController } from '@/controllers/noticias.controller';
import { NoticiasService } from '@/services/noticias.service';
import { EmpresasService } from '@/services/empresas.service';
import { Noticias } from '@/data/entities/noticias.entity';

describe('NoticiasController', () => {
  let appController: NoticiasController;
  let appService: NoticiasService;
  let empresaService: EmpresasService;
  let orm: MikroORM<IDatabaseDriver<Connection>>;

  beforeAll(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule.forRoot(), MikroOrmModule.forRoot()],
      controllers: [NoticiasController],
      providers: [NoticiasService, EmpresasService],
    }).compile();

    orm = app.get<MikroORM>(MikroORM);
    appController = app.get<NoticiasController>(NoticiasController);
    appService = app.get<NoticiasService>(NoticiasService);
    empresaService = app.get<EmpresasService>(EmpresasService);
  });
  describe('Criar noticia teste', () => {
    it('Deve criar uma nova noticia', async () => {
      const bodyEmpresa = {
        nome: 'TesteNoticia',
        codigo: 'TT',
        ativo: true,
      };
      const body = {
        url: 'teste.com',
        empresa: 'TesteNoticia',
        corpo: 'teste',
        titulo: 'teste',
        date: '2021-11-12',
      };
      await empresaService.create(bodyEmpresa);
      const news = await appService.create(body);
      if (news instanceof Noticias) {
        expect(news.url).toContain('teste.com');
      }
    });
  });

  describe('Listar noticias', () => {
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
      const news = await appController.getNews('teste.com');
      expect(news.url).toContain('teste.com');
    });
  });

  describe('Deletar noticia teste', () => {
    it('Deve deletar uma noticia', async () => {
      const newsDelete = await appService.delete('teste.com');
      const company = await empresaService.get('TesteNoticia');
      await empresaService.delete(company.id);
      expect(newsDelete).toContain(`Noticia foi removida com sucesso!`);
    });
  });

  afterAll(async () => await orm.close());
});
