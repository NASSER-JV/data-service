import { Entity, PrimaryKey, Property } from '@mikro-orm/core';

@Entity()
export class EmpresaEntity {
  @PrimaryKey({ unique: true })
  id!: number;

  @Property()
  nome!: string;

  @Property()
  codigo!: string;

  @Property()
  ativo = false;
}
