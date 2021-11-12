import { Entity, PrimaryKey, Property } from '@mikro-orm/core';

@Entity()
export class ApiKeys {
  @PrimaryKey({ unique: true })
  id!: number;

  @Property()
  key!: string;

  @Property()
  ativo!: boolean;
}
