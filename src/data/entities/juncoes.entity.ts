import { Entity, IdentifiedReference, ManyToMany, PrimaryKey, Property } from '@mikro-orm/core';
import { Empresa } from '@/data/entities/empresa.entity';

@Entity()
export class Juncoes {
  @PrimaryKey({ unique: true })
  id!: number;

  @Property()
  dataInicio!: Date;

  @Property()
  dataFim!: Date;

  @ManyToMany(() => Empresa)
  empresa: IdentifiedReference<Empresa>;
}
