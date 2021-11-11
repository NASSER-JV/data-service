import { Entity, Enum, IdentifiedReference, OneToOne, PrimaryKey, Property } from '@mikro-orm/core';
import { Sentimento } from '@/data/enums/sentimental.enum';
import { Empresa } from '@/data/entities/empresa.entity';

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
  analise: Sentimento.Neutro;

  @OneToOne(() => Empresa)
  empresa: IdentifiedReference<Empresa>;
}
