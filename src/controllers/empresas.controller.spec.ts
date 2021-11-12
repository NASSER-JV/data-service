import { Test, TestingModule } from '@nestjs/testing';
import { EmpresasController } from '@/controllers/empresas.controller';
import { EmpresasService } from '@/services/empresas.service';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { ConfigModule } from '@nestjs/config';

describe('EmpresaController', () => {
  let appController: EmpresasController;
  let appService: EmpresasService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule.forRoot(), MikroOrmModule.forRoot()],
      controllers: [EmpresasController],
      providers: [EmpresasService],
    }).compile();

    appController = app.get<EmpresasController>(EmpresasController);
    appService = app.get<EmpresasService>(EmpresasService);
  });

  describe('Listar empresas', () => {
    it('Deve retornar lista de empresas e verifica se possui Apple', async () => {
      const company = await appController.getAll();
      let name = '';
      company.forEach((S) => {
        if (S.nome == 'Apple') name = S.nome;
      });
      expect(name).toContain('Apple');
    });
  });

  describe('Procura empresa Apple', () => {
    it('Deve retornar empresa Apple', async () => {
      const company = await appController.getCompany('Apple');
      expect(company.nome).toContain('Apple');
    });
  });

  describe('Criar empresa teste', () => {
    it('Deve criar uma nova empresa', async () => {
      const body = {
        nome: 'Teste',
        codigo: 'TT',
        ativo: true,
      };
      const company = await appService.create(body);
      expect(company.nome).toContain('Teste');
    });
  });

  describe('Deletar empresa teste', () => {
    it('Deve deletar uma empresa', async () => {
      const company = await appController.getCompany('Teste');
      const companyDelete = await appService.delete(company.id);
      expect(companyDelete).toContain(`Empresa: ${company.nome} removida com sucesso!`);
    });
  });
});
