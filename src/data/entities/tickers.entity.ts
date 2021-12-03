import { Collection, Entity, ManyToMany, PrimaryKey } from '@mikro-orm/core';
import { NoticiasAnalise } from '@/data/entities/noticias-analise.entity';

@Entity()
export class Ticker {
  @PrimaryKey({ unique: true })
  nome!: string;

  @ManyToMany(() => NoticiasAnalise, (b) => b.tickers)
  noticiasAnalise = new Collection<NoticiasAnalise>(this);
}
