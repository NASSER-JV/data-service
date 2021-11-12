import { Migration } from '@mikro-orm/migrations';

export class Migration20211112041144 extends Migration {
  async up(): Promise<void> {
    this.addSql('alter table "noticias" drop constraint "noticias_empresa_id_foreign";');
    this.addSql('alter table "noticias" drop constraint "noticias_empresa_id_unique";');
    this.addSql('alter table "noticias" drop column "empresa_id";');

    this.addSql('alter table "juncoes" drop constraint "juncoes_empresa_id_foreign";');
    this.addSql('alter table "juncoes" drop constraint "juncoes_empresa_id_unique";');
    this.addSql('alter table "juncoes" drop column "empresa_id";');

    this.addSql('create table "juncoes_empresa" ("juncoes_id" int4 not null, "empresa_id" int4 not null);');
    this.addSql(
      'alter table "juncoes_empresa" add constraint "juncoes_empresa_pkey" primary key ("juncoes_id", "empresa_id");',
    );

    this.addSql('create table "noticias_empresa" ("noticias_url" varchar(255) not null, "empresa_id" int4 not null);');
    this.addSql(
      'alter table "noticias_empresa" add constraint "noticias_empresa_pkey" primary key ("noticias_url", "empresa_id");',
    );

    this.addSql(
      'alter table "juncoes_empresa" add constraint "juncoes_empresa_juncoes_id_foreign" foreign key ("juncoes_id") references "juncoes" ("id") on update cascade on delete cascade;',
    );
    this.addSql(
      'alter table "juncoes_empresa" add constraint "juncoes_empresa_empresa_id_foreign" foreign key ("empresa_id") references "empresa" ("id") on update cascade on delete cascade;',
    );

    this.addSql(
      'alter table "noticias_empresa" add constraint "noticias_empresa_noticias_url_foreign" foreign key ("noticias_url") references "noticias" ("url") on update cascade on delete cascade;',
    );
    this.addSql(
      'alter table "noticias_empresa" add constraint "noticias_empresa_empresa_id_foreign" foreign key ("empresa_id") references "empresa" ("id") on update cascade on delete cascade;',
    );
  }
}
