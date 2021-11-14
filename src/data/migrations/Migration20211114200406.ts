import { Migration } from '@mikro-orm/migrations';

export class Migration20211114200406 extends Migration {
  async up(): Promise<void> {
    this.addSql(
      'create table "empresa" ("id" serial primary key, "nome" varchar(255) not null, "codigo" varchar(255) not null, "ativo" bool not null);',
    );

    this.addSql(
      'create table "juncoes" ("id" serial primary key, "data_inicio" timestamptz(0) not null, "data_fim" timestamptz(0) not null, "empresa_id" int4 not null);',
    );

    this.addSql(
      'create table "noticias" ("url" text not null, "titulo" text not null, "corpo" text not null, "date" timestamptz(0) not null, "analise" int2 null, "empresa_id" int4 not null);',
    );
    this.addSql('alter table "noticias" add constraint "noticias_pkey" primary key ("url");');

    this.addSql(
      'create table "api_keys" ("id" serial primary key, "key" varchar(255) not null, "ativo" bool not null);',
    );

    this.addSql(
      'alter table "juncoes" add constraint "juncoes_empresa_id_foreign" foreign key ("empresa_id") references "empresa" ("id") on update cascade;',
    );

    this.addSql(
      'alter table "noticias" add constraint "noticias_empresa_id_foreign" foreign key ("empresa_id") references "empresa" ("id") on update cascade;',
    );
  }
}
