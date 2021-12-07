import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { FilterQuery, MikroORM } from '@mikro-orm/core';
import { Noticias } from '@/data/entities/noticias.entity';
import { Empresa } from '@/data/entities/empresa.entity';
import { CriarNoticiaRequest } from '@/dtos/criar-noticia.request';
import { EntityManager } from '@mikro-orm/postgresql';

@Injectable()
export class NoticiasService {
  constructor(private readonly orm: MikroORM, private readonly em: EntityManager) {}
  async list(): Promise<Noticias[]> {
    return this.em.find(Noticias, {});
  }

  async get(url: string): Promise<Noticias> {
    return this.em.findOne(Noticias, { url: url });
  }

  async create(noticia: CriarNoticiaRequest): Promise<Noticias> {
    const noticiaPersistida = await this.em.findOne(Noticias, { url: noticia.url });

    if (noticiaPersistida) {
      throw new BadRequestException(Noticias, 'Notícia já cadastrada no sistema.');
    }
    const noticiaNova = await this.processDataNews(noticia);
    await this.em.persistAndFlush(noticiaNova);
    return noticiaNova;
  }

  async createMany(noticias: CriarNoticiaRequest[]): Promise<Noticias[]> {
    const noticiasPersistidas: Noticias[] = [];

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

  async update(url: FilterQuery<Noticias>, noticia: CriarNoticiaRequest): Promise<string> {
    const noticiaPersistida = new Noticias();
    noticiaPersistida.url = noticia.url;
    noticiaPersistida.empresa = await this.em.getReference(Empresa, noticia.empresa_id);
    noticiaPersistida.corpo = noticia.texto;
    noticiaPersistida.titulo = noticia.titulo;
    if (noticia.analise !== undefined) noticiaPersistida.analise = noticia.analise;
    noticiaPersistida.date = new Date(noticia.date);
    await this.em.nativeUpdate(Noticias, url, noticiaPersistida);
    return `Noticia ${noticia.url} atualizada com sucesso!`;
  }

  async delete(url: string): Promise<Noticias> {
    const noticia = await this.em.findOne(Noticias, { url });

    if (!noticia) {
      throw new NotFoundException(Noticias, 'Noticia não foi encontrada.');
    }
    await this.em.removeAndFlush(noticia);
    return noticia;
  }

  private async processDataNews(noticia: CriarNoticiaRequest) {
    const noticiaPersistida = new Noticias();
    noticiaPersistida.url = noticia.url;
    noticiaPersistida.corpo = noticia.texto;
    noticiaPersistida.titulo = noticia.titulo;
    noticiaPersistida.empresa = this.em.getReference(Empresa, noticia.empresa_id);
    if (noticia.analise !== undefined) noticiaPersistida.analise = noticia.analise;
    noticiaPersistida.date = new Date(noticia.date);
    noticiaPersistida.sentimento = noticia.sentimento;

    this.em.create(Noticias, noticia);
    return noticiaPersistida;
  }
}
