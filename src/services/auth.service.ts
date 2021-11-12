import { Injectable } from '@nestjs/common';
import { EntityManager, MikroORM } from '@mikro-orm/core';
import { ApiKeys } from '@/data/entities/apiKeys.entity';

@Injectable()
export class AuthService {
  constructor(private readonly orm: MikroORM, private readonly em: EntityManager) {}
  validateApiKey(apiKey: string) {
    return this.em.find(ApiKeys, { key: apiKey, ativo: true });
  }
}
