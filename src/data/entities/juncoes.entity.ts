import { Entity, ManyToOne, PrimaryKey, Property } from '@mikro-orm/core';
import { Empresa } from '@/data/entities/empresa.entity';

@Entity({
  tableName: 'juncoes'
})
export class Juncao {
  @PrimaryKey({ unique: true })
  id!: number;

  @Property()
  dataInicio!: Date;

  @Property()
  dataFim!: Date;

  @ManyToOne(() => Empresa)
  empresa: Empresa;
}
