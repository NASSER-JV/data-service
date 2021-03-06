import { Injectable } from '@nestjs/common';
import { EntityManager, MikroORM } from '@mikro-orm/core';
import { Empresa } from '@/data/entities/empresa.entity';

@Injectable()
export class EmpresasService {
  constructor(private readonly orm: MikroORM, private readonly em: EntityManager) {}
  async list(): Promise<Empresa[]> {
    return this.em.find(Empresa, { ativo: true });
  }

  async get(sigla, ativo): Promise<Empresa> {
    return this.em.findOne(Empresa, { codigo: sigla, ativo: ativo });
  }

  async create(body): Promise<Empresa | string> {
    const empresaInDatabase = await this.em.findOne(Empresa, { codigo: body.codigo, ativo: true });
    if (empresaInDatabase !== null) {
      return `A empresa ${empresaInDatabase.nome} ja foi cadastrada anteriormente!`;
    }
    const empresa = this.em.create(Empresa, { nome: body.nome, codigo: body.codigo, ativo: body.ativo });
    await this.em.persistAndFlush(empresa);
    return empresa;
  }

  async update(id, body): Promise<string> {
    const updateEmpresa: Empresa = {
      id,
      nome: body.nome,
      codigo: body.codigo,
      ativo: body.ativo,
    };
    await this.em.nativeUpdate(Empresa, id, updateEmpresa);
    return `${updateEmpresa.nome} atualizada com sucesso!`;
  }

  async delete(id): Promise<string> {
    const empresa = await this.em.findOne(Empresa, id);
    await this.em.removeAndFlush(empresa);
    return `Empresa: ${empresa.nome} removida com sucesso!`;
  }
}
