import { Entity, Enum, IdentifiedReference, OneToOne, PrimaryKey, Property } from '@mikro-orm/core';
import { SentimentalEnum } from '@/data/sentimental.enum';
import { Empresa } from './Empresa';

@Entity()
export class Noticias {
  @PrimaryKey({ unique: true })
  url!: string;

  @Property()
  titulo!: string;

  @Property()
  corpo!: string;

  @Property()
  date: Date;

  @Enum()
  analise: SentimentalEnum.Neutro;

  @OneToOne(() => Empresa)
  empresa: IdentifiedReference<Empresa>;
}
