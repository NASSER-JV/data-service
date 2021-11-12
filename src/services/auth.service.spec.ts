import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Connection, IDatabaseDriver, MikroORM } from '@mikro-orm/core';

describe('AuthService', () => {
  let service: AuthService;
  let orm: MikroORM<IDatabaseDriver<Connection>>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [MikroOrmModule.forRoot()],
      providers: [AuthService],
    }).compile();

    orm = module.get<MikroORM>(MikroORM);
    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  afterAll(async () => await orm.close());
});
