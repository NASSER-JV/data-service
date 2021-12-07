import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { EntityManager, MikroORM } from '@mikro-orm/core';
import { Empresa } from '@/data/entities/empresa.entity';
import { Noticia } from '@/data/entities/noticias.entity';
import { CriarEmpresaRequest } from '@/dtos/criar-empresa.request';
import { BuscarEmpresaQuery } from '@/dtos/buscar-empresa.query';

@Injectable()
export class EmpresasService {
  constructor(private readonly orm: MikroORM, private readonly em: EntityManager) {}
  async list(): Promise<Empresa[]> {
    return this.em.find(Empresa, { ativo: true });
  }

  async get(query: BuscarEmpresaQuery): Promise<Empresa> {
    return this.em.findOne(Empresa, { codigo: query.sigla, ativo: query.ativo });
  }

  async create(empresa: CriarEmpresaRequest): Promise<Empresa | string> {
    const empresaInDatabase = await this.em.findOne(Empresa, { codigo: empresa.codigo, ativo: true });
    if (empresaInDatabase) {
      throw new BadRequestException(Empresa, 'Empresa já cadastrada no sistema.');
    }
    const empresaPersistida = this.em.create(Empresa, {
      nome: empresa.nome,
      codigo: empresa.codigo,
      ativo: empresa.ativo,
    });
    await this.em.persistAndFlush(empresaPersistida);
    return empresaPersistida;
  }

  async update(id: number, empresa: CriarEmpresaRequest): Promise<string> {
    const updateEmpresa: Empresa = {
      id,
      nome: empresa.nome,
      codigo: empresa.codigo,
      ativo: empresa.ativo,
    };
    await this.em.nativeUpdate(Empresa, id, updateEmpresa);
    return `${updateEmpresa.nome} atualizada com sucesso!`;
  }

  async delete(id: number): Promise<string> {
    const empresa = await this.em.findOne(Empresa, id);
    if (!empresa) {
      throw new NotFoundException(Noticia, 'Noticia não foi encontrada.');
    }
    await this.em.removeAndFlush(empresa);
    return `Empresa: ${empresa.nome} removida com sucesso!`;
  }
}
