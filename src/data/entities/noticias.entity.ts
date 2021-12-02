import { Entity, Enum, IdentifiedReference, ManyToOne, PrimaryKey, Property } from '@mikro-orm/core';
import { Sentimento } from '@/data/enums/sentimental.enum';
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

  @Enum({ nullable: true })
  analise: Sentimento.Neutro;

  @ManyToOne(() => Empresa)
  empresa: IdentifiedReference<Empresa>;
}
