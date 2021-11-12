import { Injectable } from '@nestjs/common';
import { EntityManager, MikroORM } from '@mikro-orm/core';
import { Noticias } from '@/data/entities/noticias.entity';
import { Empresa } from '@/data/entities/empresa.entity';

@Injectable()
export class NoticiasService {
  constructor(private readonly orm: MikroORM, private readonly em: EntityManager) {}
  async list(): Promise<Noticias[]> {
    return this.em.find(Noticias, {});
  }

  async get(url): Promise<Noticias> {
    return this.em.findOne(Noticias, { url: url });
  }

  async create(body): Promise<Noticias | string> {
    const empresa = await this.em.findOne(Empresa, { nome: body.empresa, ativo: true });
    const noticiaInDatabase = await this.em.findOne(Noticias, { url: body.url });
    if (noticiaInDatabase !== null) {
      return `A notícia ja foi cadastrada anteriormente!`;
    }
    const noticia = this.em.create(Noticias, {
      url: body.url,
      empresa: empresa.id,
      corpo: body.corpo,
      titulo: body.titulo,
      date: new Date(body.date),
    });
    await this.em.persistAndFlush(noticia);
    return noticia;
  }

  async delete(url): Promise<string> {
    const noticia = await this.em.findOne(Noticias, { url });
    if (noticia === null) return 'Noticia não encontrada.';
    await this.em.removeAndFlush(noticia);
    return `Noticia foi removida com sucesso!`;
  }
}
