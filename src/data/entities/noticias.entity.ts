import { Entity, ManyToOne, PrimaryKey, Property } from '@mikro-orm/core';
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

  @Property()
  sentimento!: number;

  @Property({ nullable: true, comment: 'Analise do ML' })
  analise: number;

  @ManyToOne(() => Empresa)
  empresa: Empresa;
}
