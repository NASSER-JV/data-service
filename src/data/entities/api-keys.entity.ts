import { Entity, PrimaryKey, Property } from '@mikro-orm/core';

@Entity({
  tableName: 'api-keys'
})
export class ApiKey {
  @PrimaryKey({ unique: true })
  id!: number;

  @Property()
  key!: string;

  @Property()
  ativo!: boolean;
}
