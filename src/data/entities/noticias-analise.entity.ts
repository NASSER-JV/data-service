import { Collection, Entity, ManyToMany, PrimaryKey, Property } from '@mikro-orm/core';
import { Ticker } from '@/data/entities/tickers.entity';

@Entity()
export class NoticiasAnalise {
  @PrimaryKey({ unique: true, type: 'text' })
  url!: string;

  @Property({ type: 'text' })
  titulo!: string;

  @Property({ type: 'text' })
  texto!: string;

  @Property()
  sentimento!: number;

  @ManyToMany(() => Ticker)
  ticker = new Collection<Ticker>(this);
}
