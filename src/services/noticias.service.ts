import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
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

  async create(body): Promise<Noticias> {
    try {
      const noticia = await this.processDataNews(body);
      await this.em.persistAndFlush(noticia);
      return noticia;
    } catch {
      throw new HttpException('Noticia já cadastrada no sistema.', HttpStatus.BAD_REQUEST);
    }
  }

  async createMany(body): Promise<Noticias[]> {
    const notices = [];
    for (const b of body) {
      try {
        const noticia = await this.processDataNews(b);
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
    noticia.corpo = body.texto;
    noticia.titulo = body.titulo;
    noticia.date = new Date(body.date);
    await this.em.nativeUpdate(Noticias, url, noticia);
    return `Noticia ${noticia.url} atualizada com sucesso!`;
  }

  async delete(url): Promise<Noticias> {
    try {
      const noticia = await this.em.findOne(Noticias, { url });
      await this.em.removeAndFlush(noticia);
      return noticia;
    } catch {
      throw new HttpException('Noticia não foi encontrada.', HttpStatus.BAD_REQUEST);
    }
  }

  private async processDataNews(body) {
    const noticia = new Noticias();
    noticia.url = body.url;
    noticia.corpo = body.texto;
    noticia.titulo = body.titulo;
    noticia.empresa = body.empresa_id;
    noticia.date = new Date(body.date);
    noticia.sentimento = body.sentimento;

    await this.em.create(Noticias, noticia);
    return noticia;
  }
}
