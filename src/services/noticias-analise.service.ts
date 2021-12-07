import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { MikroORM } from '@mikro-orm/core';
import { NoticiaAnalise } from '@/data/entities/noticias-analise.entity';
import { Ticker } from '@/data/entities/tickers.entity';
import { EntityManager } from '@mikro-orm/postgresql';
import { groupBy } from 'lodash';
import { CriarNoticiaAnaliseRequest } from '@/dtos/criar-noticia-analise.request';
import { Noticia } from '@/data/entities/noticias.entity';
import { BuscarNoticiasAnaliseResponse } from '@/dtos/buscar-noticias-analise.response';

@Injectable()
export class NoticiasAnaliseService {
  constructor(private readonly orm: MikroORM, private readonly em: EntityManager) {}
  async list(): Promise<NoticiaAnalise[]> {
    return this.em.find(NoticiaAnalise, {});
  }

  async get(tickers: string[]): Promise<BuscarNoticiasAnaliseResponse[]> {
    const resultado = await this.em.execute(
      `
          SELECT na.url,
                 na.titulo,
                 na.texto,
                 na.sentimento,
                 t.nome
          FROM noticias_analise AS na
                   INNER JOIN noticias_analise_tickers AS nat ON na.url = nat.noticias_analise_url
                   INNER JOIN ticker AS t ON t.nome = nat.ticker_nome
          WHERE t.nome IN (?)
    `,
      tickers,
    );
    const noticiasAgrupadas = groupBy(resultado, 'url');

    return Object.entries(noticiasAgrupadas).map(([url, noticias]) => {
      const noticia = noticias[0];

      return new BuscarNoticiasAnaliseResponse(
        url,
        noticia.titulo,
        noticia.texto,
        noticia.sentimento,
        noticias.map((ticker) => ticker.nome),
      );
    });
  }

  async create(noticia: CriarNoticiaAnaliseRequest): Promise<NoticiaAnalise> {
    const noticiaPersistida = await this.em.findOne(NoticiaAnalise, { url: noticia.url });

    if (noticiaPersistida) {
      throw new BadRequestException(Noticia, 'Notícia já cadastrada no sistema.');
    }
    const noticiaNova = await this.processNewsData(noticia);

    await this.em.persistAndFlush(noticiaNova);
    return noticiaPersistida;
  }

  async createMany(noticias: CriarNoticiaAnaliseRequest[]): Promise<NoticiaAnalise[] | string> {
    const noticiasPersistidas: NoticiaAnalise[] = [];

    try {
      await Promise.all(
        noticias.map(async (noticia) => {
          const noticiaPersistida = await this.processNewsData(noticia);
          await this.em.persistAndFlush(noticiaPersistida);
          noticiasPersistidas.push(noticiaPersistida);
        }),
      );
    } catch {}
    return noticiasPersistidas;
  }

  async delete(url: string): Promise<NoticiaAnalise> {
    const noticia = await this.em.findOne(NoticiaAnalise, { url });

    if (!noticia) {
      throw new NotFoundException(NoticiaAnalise, 'Noticia não foi encontrada.');
    }

    await this.em.removeAndFlush(noticia);
    return noticia;
  }

  private async processNewsData(news: CriarNoticiaAnaliseRequest) {
    const noticia = new NoticiaAnalise();
    noticia.url = news.url;
    noticia.texto = news.texto;
    noticia.titulo = news.titulo;
    noticia.sentimento = news.sentimento;
    if (news.tickers !== undefined) {
      for (const t of news.tickers) {
        let ticker = await this.em.findOne(Ticker, { nome: t });
        if (!ticker) {
          const newTicker = {
            nome: t,
          };
          ticker = this.em.create(Ticker, newTicker);
          await this.em.persistAndFlush(ticker);
        }
        noticia.tickers.add(ticker);
      }
    }
    return noticia;
  }
}
