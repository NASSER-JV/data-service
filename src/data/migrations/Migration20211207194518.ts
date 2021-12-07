import { Migration } from '@mikro-orm/migrations';

export class Migration20211207194518 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "tickers" ("nome" varchar(255) not null);');
    this.addSql('alter table "tickers" add constraint "tickers_pkey" primary key ("nome");');

    this.addSql('create table "noticias_analise" ("url" text not null, "titulo" text not null, "texto" text not null, "sentimento" int4 not null);');
    this.addSql('alter table "noticias_analise" add constraint "noticias_analise_pkey" primary key ("url");');

    this.addSql('create table "noticias_analise_tickers" ("noticia_analise_url" text not null, "ticker_nome" varchar(255) not null);');
    this.addSql('alter table "noticias_analise_tickers" add constraint "noticias_analise_tickers_pkey" primary key ("noticia_analise_url", "ticker_nome");');

    this.addSql('create table "empresas" ("id" serial primary key, "nome" varchar(255) not null, "codigo" varchar(255) not null, "ativo" bool not null);');

    this.addSql('create table "juncoes" ("id" serial primary key, "data_inicio" timestamptz(0) not null, "data_fim" timestamptz(0) not null, "empresa_id" int4 not null);');

    this.addSql('create table "noticias" ("url" text not null, "titulo" text not null, "corpo" text not null, "date" timestamptz(0) not null, "sentimento" int4 not null, "analise" int4 null, "empresa_id" int4 not null);');
    this.addSql('comment on column "noticias"."analise" is \'Analise do ML\';');
    this.addSql('alter table "noticias" add constraint "noticias_pkey" primary key ("url");');

    this.addSql('create table "api-keys" ("id" serial primary key, "key" varchar(255) not null, "ativo" bool not null);');

    this.addSql('alter table "noticias_analise_tickers" add constraint "noticias_analise_tickers_noticia_analise_url_foreign" foreign key ("noticia_analise_url") references "noticias_analise" ("url") on update cascade on delete cascade;');
    this.addSql('alter table "noticias_analise_tickers" add constraint "noticias_analise_tickers_ticker_nome_foreign" foreign key ("ticker_nome") references "tickers" ("nome") on update cascade on delete cascade;');

    this.addSql('alter table "juncoes" add constraint "juncoes_empresa_id_foreign" foreign key ("empresa_id") references "empresas" ("id") on update cascade;');

    this.addSql('alter table "noticias" add constraint "noticias_empresa_id_foreign" foreign key ("empresa_id") references "empresas" ("id") on update cascade;');
  }

}
