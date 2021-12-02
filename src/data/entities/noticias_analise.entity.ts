import { Entity, Enum, PrimaryKey, Property } from '@mikro-orm/core';

@Entity()
export class NoticiasAnalise {
  @PrimaryKey({ unique: true, type: 'text' })
  url!: string;

  @Property({ type: 'text' })
  titulo!: string;

  @Property({ type: 'text' })
  texto!: string;

  @Enum({ nullable: true })
  sentimento: bigint;

  @Property()
  ticker: string;
}
