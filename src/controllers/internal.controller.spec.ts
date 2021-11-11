import { Test, TestingModule } from '@nestjs/testing';
import {InternalController} from "@/controllers/internal.controller";
import {TerminusModule} from "@nestjs/terminus";
import {HttpModule} from "@nestjs/axios";

describe('InternalController', () => {
  let appController: InternalController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [TerminusModule, HttpModule],
      controllers: [InternalController],
      providers: [],
    }).compile();

    appController = app.get<InternalController>(InternalController);
  });

  describe('Health Check', () => {
    it('Deve retornar com o "status: "ok"" ', async () => {
      expect(await appController.healthCheck()).toMatchObject({status: 'ok'});
    });
  });
});
