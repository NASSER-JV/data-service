import { Entity, IdentifiedReference, ManyToOne, PrimaryKey, Property } from '@mikro-orm/core';
import { Empresa } from '@/data/entities/empresa.entity';

@Entity()
export class Noticias {
  @PrimaryKey({ unique: true, type: 'text' })
  url!: string;

  @Property({ type: 'text' })
  titulo!: string;

  @Property({ type: 'text' })
  corpo!: string;

  @Property()
  date: Date;

  @Property({ type: 'number' })
  sentimento!: bigint;

  @ManyToOne(() => Empresa)
  empresa: IdentifiedReference<Empresa>;
}
