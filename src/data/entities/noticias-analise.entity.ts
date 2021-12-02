import { Entity, PrimaryKey, Property } from '@mikro-orm/core';

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

  @Property()
  ticker!: string;
}
