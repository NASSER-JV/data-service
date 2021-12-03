import { Injectable } from '@nestjs/common';
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

  async create(body): Promise<NoticiasAnalise | string> {
    const noticia = await this.processNewsData(body);
    await this.em.persistAndFlush(noticia);
    if (noticia !== null) return noticia;
    return 'Noticia já existe na base de dados!';
  }

  async createMany(body): Promise<NoticiasAnalise[] | string> {
    const notices = [];
    for (const b of body) {
      const noticia = await this.processNewsData(b);
      notices.push(noticia);
    }
    await this.em.persistAndFlush(notices);
    return notices;
  }

  async delete(url): Promise<string> {
    const noticia = await this.em.findOne(NoticiasAnalise, { url });
    if (noticia === null) return 'Noticia não encontrada.';
    await this.em.removeAndFlush(noticia);
    return `Noticia foi removida com sucesso!`;
  }

  private async processNewsData(b) {
    const noticiaInDatabase = await this.em.findOne(NoticiasAnalise, { url: b.url });
    if (noticiaInDatabase === null) {
      const noticia = new NoticiasAnalise();
      noticia.url = b.url;
      noticia.texto = b.texto;
      noticia.titulo = b.titulo;
      for (const t of b.tickers) {
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
      noticia.sentimento = b.sentimento;

      this.em.create(NoticiasAnalise, noticia);
      return noticia;
    }
  }
}
