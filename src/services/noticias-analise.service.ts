import { Injectable } from '@nestjs/common';
import { EntityManager, MikroORM } from '@mikro-orm/core';
import { NoticiasAnalise } from '@/data/entities/noticias-analise.entity';

@Injectable()
export class NoticiasAnaliseService {
  constructor(private readonly orm: MikroORM, private readonly em: EntityManager) {}
  async list(): Promise<NoticiasAnalise[]> {
    return this.em.find(NoticiasAnalise, {});
  }

  async get(codigo): Promise<NoticiasAnalise[]> {
    return this.em.find(NoticiasAnalise, { ticker: codigo });
  }

  async create(body): Promise<NoticiasAnalise | string> {
    const noticiaInDatabase = await this.em.findOne(NoticiasAnalise, { url: body.url });
    if (noticiaInDatabase === null) {
      const noticia = new NoticiasAnalise();
      noticia.url = body.url;
      noticia.texto = body.texto;
      noticia.titulo = body.titulo;
      for (const t of body.ticker) {
        if (t !== undefined) {
          if (body.ticker.length > 1) {
            noticia.ticker += `${t}, `;
          } else {
            noticia.ticker += `${t}`;
          }
        }
      }
      noticia.ticker = noticia.ticker.replace('undefined', '');
      noticia.sentimento = body.sentimento;

      this.em.create(NoticiasAnalise, noticia);
      await this.em.persistAndFlush(noticia);
      return noticia;
    }
    return 'Noticia já existe na base de dados!';
  }

  async createMany(body): Promise<NoticiasAnalise[] | string> {
    const notices = [];
    for (const b of body) {
      const noticiaInDatabase = await this.em.findOne(NoticiasAnalise, { url: b.url });
      if (noticiaInDatabase === null) {
        const noticia = new NoticiasAnalise();
        noticia.url = b.url;
        noticia.texto = b.texto;
        noticia.titulo = b.titulo;
        for (const t of b.ticker) {
          if (t !== undefined) {
            if (b.ticker.length > 1) {
              noticia.ticker += `${t}, `;
            } else {
              noticia.ticker += `${t}`;
            }
          }
        }
        noticia.ticker = noticia.ticker.replace('undefined', '');
        noticia.sentimento = b.sentimento;

        this.em.create(NoticiasAnalise, noticia);
        notices.push(noticia);
      }
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
}
