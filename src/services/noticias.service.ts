import { Injectable } from '@nestjs/common';
import { EntityManager, MikroORM } from '@mikro-orm/core';
import { Noticias } from '@/data/entities/noticias.entity';

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
    const noticiaInDatabase = await this.em.findOne(Noticias, { url: body.url });
    if (noticiaInDatabase !== null) {
      return `A notícia ja foi cadastrada anteriormente!`;
    }
    const noticia = new Noticias();
    noticia.url = body.url;
    noticia.corpo = body.corpo;
    noticia.titulo = body.titulo;
    noticia.empresa = body.empresa_id;
    noticia.date = new Date(body.date);
    if (body.analise !== undefined) {
      noticia.analise = body.analise;
    }
    this.em.create(Noticias, noticia);
    await this.em.persistAndFlush(noticia);
    return noticia;
  }

  async createMany(body): Promise<Noticias[] | string> {
    const notices = [];
    for (const b of body) {
      const noticiaInDatabase = await this.em.findOne(Noticias, { url: b.url });
      if (noticiaInDatabase === null) {
        const noticia = new Noticias();
        noticia.url = b.url;
        noticia.empresa = b.empresa_id;
        noticia.corpo = b.corpo;
        noticia.titulo = b.titulo;
        noticia.date = new Date(b.date);
        if (b.analise !== undefined) {
          noticia.analise = b.analise;
        }
        this.em.create(Noticias, noticia);
        notices.push(noticia);
      }
    }
    await this.em.persistAndFlush(notices);
    return notices;
  }

  async update(url, body): Promise<string> {
    const noticia = new Noticias();
    noticia.url = body.url;
    noticia.empresa = body.empresa_id;
    noticia.corpo = body.corpo;
    noticia.titulo = body.titulo;
    noticia.date = new Date(body.date);
    await this.em.nativeUpdate(Noticias, url, noticia);
    return `Noticia ${noticia.url} atualizada com sucesso!`;
  }

  async delete(url): Promise<string> {
    const noticia = await this.em.findOne(Noticias, { url });
    if (noticia === null) return 'Noticia não encontrada.';
    await this.em.removeAndFlush(noticia);
    return `Noticia foi removida com sucesso!`;
  }
}
