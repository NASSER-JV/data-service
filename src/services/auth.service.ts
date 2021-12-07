import { Injectable } from '@nestjs/common';
import { EntityManager, MikroORM } from '@mikro-orm/core';
import { ApiKey } from '@/data/entities/api-keys.entity';

@Injectable()
export class AuthService {
  constructor(private readonly orm: MikroORM, private readonly em: EntityManager) {}
  validateApiKey(apiKey: string) {
    return this.em.find(ApiKey, { key: apiKey, ativo: true });
  }
}
