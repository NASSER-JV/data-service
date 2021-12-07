import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { FilterQuery, MikroORM } from '@mikro-orm/core';
import { Noticia } from '@/data/entities/noticias.entity';
import { Empresa } from '@/data/entities/empresa.entity';
import { CriarNoticiaRequest } from '@/dtos/criar-noticia.request';
import { EntityManager } from '@mikro-orm/postgresql';

@Injectable()
export class NoticiasService {
  constructor(private readonly orm: MikroORM, private readonly em: EntityManager) {}
  async list(): Promise<Noticia[]> {
    return this.em.find(Noticia, {});
  }

  async get(url: string): Promise<Noticia> {
    return this.em.findOne(Noticia, { url: url });
  }

  async create(noticia: CriarNoticiaRequest): Promise<Noticia> {
    const noticiaPersistida = await this.em.findOne(Noticia, { url: noticia.url });

    if (noticiaPersistida) {
      throw new BadRequestException(Noticia, 'Notícia já cadastrada no sistema.');
    }
    const noticiaNova = await this.processDataNews(noticia);
    await this.em.persistAndFlush(noticiaNova);
    return noticiaNova;
  }

  async createMany(noticias: CriarNoticiaRequest[]): Promise<Noticia[]> {
    const noticiasPersistidas: Noticia[] = [];

    try {
      await Promise.all(
        noticias.map(async (noticia) => {
          const noticiaPersistida = await this.processDataNews(noticia);
          await this.em.persistAndFlush(noticiaPersistida);
          noticiasPersistidas.push(noticiaPersistida);
        }),
      );
    } catch {}
    return noticiasPersistidas;
  }

  async update(url: FilterQuery<Noticia>, noticia: CriarNoticiaRequest): Promise<string> {
    const noticiaPersistida = new Noticia();
    noticiaPersistida.url = noticia.url;
    noticiaPersistida.empresa = this.em.getReference(Empresa, noticia.empresa_id);
    noticiaPersistida.corpo = noticia.texto;
    noticiaPersistida.titulo = noticia.titulo;
    if (noticia.analise !== undefined) noticiaPersistida.analise = noticia.analise;
    noticiaPersistida.date = new Date(noticia.date);
    await this.em.nativeUpdate(Noticia, url, noticiaPersistida);
    return `Noticia ${noticia.url} atualizada com sucesso!`;
  }

  async delete(url: string): Promise<Noticia> {
    const noticia = await this.em.findOne(Noticia, { url });

    if (!noticia) {
      throw new NotFoundException(Noticia, 'Noticia não foi encontrada.');
    }
    await this.em.removeAndFlush(noticia);
    return noticia;
  }

  private async processDataNews(noticia: CriarNoticiaRequest) {
    const noticiaPersistida = new Noticia();
    noticiaPersistida.url = noticia.url;
    noticiaPersistida.corpo = noticia.texto;
    noticiaPersistida.titulo = noticia.titulo;
    noticiaPersistida.empresa = this.em.getReference(Empresa, noticia.empresa_id);
    if (noticia.analise !== undefined) noticiaPersistida.analise = noticia.analise;
    noticiaPersistida.date = new Date(noticia.date);
    noticiaPersistida.sentimento = noticia.sentimento;

    this.em.create(Noticia, noticia);
    return noticiaPersistida;
  }
}
