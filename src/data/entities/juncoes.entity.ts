import { Entity, IdentifiedReference, OneToOne, PrimaryKey, Property } from '@mikro-orm/core';
import { Empresa } from '@/data/entities/empresa.entity';

@Entity()
export class Juncoes {
  @PrimaryKey({ unique: true })
  id!: number;

  @Property()
  dataInicio!: Date;

  @Property()
  dataFim!: Date;

  @OneToOne(() => Empresa)
  empresa: IdentifiedReference<Empresa>;
}
