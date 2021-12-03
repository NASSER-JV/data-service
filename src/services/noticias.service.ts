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
    try {
      const noticia = this.processDataNews(body);
      await this.em.persistAndFlush(noticia);
      return noticia;
    } catch {
      return 'Noticia já existe na base de dados!';
    }
  }

  async createMany(body): Promise<Noticias[] | string> {
    const notices = [];
    for (const b of body) {
      try {
        const noticia = this.processDataNews(b);
        notices.push(noticia);
      } catch {}
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
    try {
      const noticia = await this.em.findOne(Noticias, { url });
      await this.em.removeAndFlush(noticia);
    } catch {
      return 'Noticia não foi encontrada na base de dados!';
    }
  }

  private async processDataNews(body) {
    const noticia = new Noticias();
    noticia.url = body.url;
    noticia.corpo = body.corpo;
    noticia.titulo = body.titulo;
    noticia.empresa = body.empresa_id;
    noticia.date = new Date(body.date);
    noticia.sentimento = body.sentimento;

    this.em.create(Noticias, noticia);
    return noticia;
  }
}
