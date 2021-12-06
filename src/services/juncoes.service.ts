import { BadRequestException, Injectable } from '@nestjs/common';
import { EntityManager, MikroORM } from '@mikro-orm/core';
import { Juncoes } from '@/data/entities/juncoes.entity';
import { Empresa } from '@/data/entities/empresa.entity';
import { CriarJuncaoRequest } from '@/dtos/criar-juncao.request';

@Injectable()
export class JuncoesService {
  constructor(private readonly orm: MikroORM, private readonly em: EntityManager) {}
  async list(): Promise<Juncoes[]> {
    return this.em.find(Juncoes, {});
  }

  async get(id: number): Promise<Juncoes> {
    return this.em.findOne(Juncoes, { id: id });
  }

  async create(juncao: CriarJuncaoRequest): Promise<Juncoes | string> {
    if (juncao.juncaoId !== undefined) {
      const juncaoInDatabase = await this.em.findOne(Juncoes, { id: juncao.juncaoId });
      if (juncaoInDatabase !== null) {
        throw new BadRequestException(Juncoes, 'Junção já cadastrada no sistema.');
      }
    }
    const juncaoPersistida = await this.em.create(Juncoes, {
      dataInicio: new Date(juncao.dataInicio),
      dataFim: new Date(juncao.dataFim),
      empresa: juncao.empresa_id,
    });
    await this.em.persistAndFlush(juncaoPersistida);
    return juncaoPersistida;
  }

  async update(id: number, juncao: CriarJuncaoRequest): Promise<string> {
    const updateJuncoes: Juncoes = {
      id,
      dataFim: new Date(juncao.dataFim),
      dataInicio: new Date(juncao.dataInicio),
      empresa: this.em.getReference(Empresa, juncao.empresa_id),
    };
    await this.em.nativeUpdate(Juncoes, id, updateJuncoes);
    return `Junção ${updateJuncoes.id} atualizada com sucesso!`;
  }

  async delete(id: number): Promise<string> {
    const juncao = await this.em.findOne(Juncoes, { id });
    if (juncao === null) return 'Junção não encontrada.';
    await this.em.removeAndFlush(juncao);
    return `Junção foi removida com sucesso!`;
  }
}
