import { Collection, Entity, ManyToMany, PrimaryKey, Property } from '@mikro-orm/core';
import { Ticker } from '@/data/entities/tickers.entity';

@Entity({
  tableName: 'noticias_analise'
})
export class NoticiaAnalise {
  @PrimaryKey({ unique: true, type: 'text' })
  url!: string;

  @Property({ type: 'text' })
  titulo!: string;

  @Property({ type: 'text' })
  texto!: string;

  @Property()
  sentimento!: number;

  @ManyToMany(() => Ticker)
  tickers = new Collection<Ticker>(this);
}
