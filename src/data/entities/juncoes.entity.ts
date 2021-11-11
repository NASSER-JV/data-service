import { Entity, IdentifiedReference, OneToOne, PrimaryKey, Property } from '@mikro-orm/core';
import { EmpresaEntity } from '@/data/entities/empresa.entity';

@Entity()
export class JuncoesEntity {
  @PrimaryKey({ unique: true })
  id!: number;

  @Property()
  dataInicio!: Date;

  @Property()
  dataFim!: Date;

  @OneToOne(() => EmpresaEntity)
  empresa: IdentifiedReference<EmpresaEntity>;
}
