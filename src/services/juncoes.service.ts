import { Injectable } from '@nestjs/common';
import { EntityManager, MikroORM } from '@mikro-orm/core';
import { Juncoes } from '@/data/entities/juncoes.entity';

@Injectable()
export class JuncoesService {
  constructor(private readonly orm: MikroORM, private readonly em: EntityManager) {}
  async list(): Promise<Juncoes[]> {
    return this.em.find(Juncoes, {});
  }

  async get(id): Promise<Juncoes> {
    return this.em.findOne(Juncoes, { id: id });
  }

  async create(body): Promise<Juncoes | string> {
    if (body.juncaoId !== undefined) {
      const juncaoInDatabase = await this.em.findOne(Juncoes, { id: body.juncaoId });
      if (juncaoInDatabase !== null) {
        return `A junção ja foi cadastrada anteriormente!`;
      }
    }
    const juncao = await this.em.create(Juncoes, {
      dataInicio: new Date(body.dataInicio),
      dataFim: new Date(body.dataFim),
      empresa: body.empresa_id,
    });
    await this.em.persistAndFlush(juncao);
    return juncao;
  }

  async update(id, body): Promise<string> {
    const updateJuncoes: Juncoes = {
      id,
      dataFim: new Date(body.dataFim),
      dataInicio: new Date(body.dataInicio),
      empresa: body.empresa_id,
    };
    await this.em.nativeUpdate(Juncoes, id, updateJuncoes);
    return `Junção ${updateJuncoes.id} atualizada com sucesso!`;
  }

  async delete(id): Promise<string> {
    const juncao = await this.em.findOne(Juncoes, { id });
    if (juncao === null) return 'Junção não encontrada.';
    await this.em.removeAndFlush(juncao);
    return `Junção foi removida com sucesso!`;
  }
}
