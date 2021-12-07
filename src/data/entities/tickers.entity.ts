import { Collection, Entity, ManyToMany, PrimaryKey } from '@mikro-orm/core';
import { NoticiaAnalise } from '@/data/entities/noticias-analise.entity';

@Entity({
  tableName: 'tickers'
})
export class Ticker {
  @PrimaryKey({ unique: true })
  nome!: string;

  @ManyToMany(() => NoticiaAnalise, (b) => b.tickers)
  noticiasAnalise = new Collection<NoticiaAnalise>(this);
}
