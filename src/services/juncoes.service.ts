import { BadRequestException, Injectable } from '@nestjs/common';
import { EntityManager, MikroORM } from '@mikro-orm/core';
import { Juncao } from '@/data/entities/juncoes.entity';
import { Empresa } from '@/data/entities/empresa.entity';
import { CriarJuncaoRequest } from '@/dtos/criar-juncao.request';

@Injectable()
export class JuncoesService {
  constructor(private readonly orm: MikroORM, private readonly em: EntityManager) {}
  async list(): Promise<Juncao[]> {
    return this.em.find(Juncao, {});
  }

  async get(id: number): Promise<Juncao> {
    return this.em.findOne(Juncao, { id: id });
  }

  async create(juncao: CriarJuncaoRequest): Promise<Juncao | string> {
    if (juncao.juncaoId !== undefined) {
      const juncaoInDatabase = await this.em.findOne(Juncao, { id: juncao.juncaoId });
      if (juncaoInDatabase !== null) {
        throw new BadRequestException(Juncao, 'Junção já cadastrada no sistema.');
      }
    }
    const juncaoPersistida = this.em.create(Juncao, {
      dataInicio: new Date(juncao.dataInicio),
      dataFim: new Date(juncao.dataFim),
      empresa: juncao.empresa_id,
    });
    await this.em.persistAndFlush(juncaoPersistida);
    return juncaoPersistida;
  }

  async update(id: number, juncao: CriarJuncaoRequest): Promise<string> {
    const updateJuncoes: Juncao = {
      id,
      dataFim: new Date(juncao.dataFim),
      dataInicio: new Date(juncao.dataInicio),
      empresa: this.em.getReference(Empresa, juncao.empresa_id),
    };
    await this.em.nativeUpdate(Juncao, id, updateJuncoes);
    return `Junção ${updateJuncoes.id} atualizada com sucesso!`;
  }

  async delete(id: number): Promise<string> {
    const juncao = await this.em.findOne(Juncao, { id });
    if (juncao === null) return 'Junção não encontrada.';
    await this.em.removeAndFlush(juncao);
    return `Junção foi removida com sucesso!`;
  }
}
