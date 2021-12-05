import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { EntityManager, MikroORM } from '@mikro-orm/core';
import { NoticiasAnalise } from '@/data/entities/noticias-analise.entity';
import { Ticker } from '@/data/entities/tickers.entity';

@Injectable()
export class NoticiasAnaliseService {
  constructor(private readonly orm: MikroORM, private readonly em: EntityManager) {}
  async list(): Promise<NoticiasAnalise[]> {
    return this.em.find(NoticiasAnalise, {});
  }

  async get(codigo): Promise<NoticiasAnalise[]> {
    return this.em.find(NoticiasAnalise, { tickers: codigo });
  }

  async create(body): Promise<NoticiasAnalise> {
    try {
      const noticia = await this.processNewsData(body);
      await this.em.persistAndFlush(noticia);
      return noticia;
    } catch {
      throw new HttpException('Noticia já cadastrada no banco de dados.', HttpStatus.BAD_REQUEST);
    }
  }

  async createMany(body): Promise<NoticiasAnalise[] | string> {
    const notices = [];
    for (const b of body) {
      try {
        const noticia = await this.processNewsData(b);
        notices.push(noticia);
      } catch {}
    }
    await this.em.persistAndFlush(notices);
    return notices;
  }

  async delete(url): Promise<NoticiasAnalise> {
    try {
      const noticia = await this.em.findOne(NoticiasAnalise, { url });
      await this.em.removeAndFlush(noticia);
      return noticia;
    } catch {
      throw new HttpException('Noticia não foi encontrada.', HttpStatus.BAD_REQUEST);
    }
  }

  private async processNewsData(news) {
    const noticia = new NoticiasAnalise();
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
          ticker = await this.em.create(Ticker, newTicker);
          await this.em.persistAndFlush(ticker);
        }
        noticia.tickers.add(ticker);
      }
    }
    return noticia;
  }
}