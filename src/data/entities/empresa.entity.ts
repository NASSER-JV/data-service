import { Entity, PrimaryKey, Property } from '@mikro-orm/core';

@Entity()
export class Empresa {
  @PrimaryKey({ unique: true })
  id!: number;

  @Property()
  nome!: string;

  @Property()
  codigo!: string;

  @Property()
  ativo!: boolean;
}
