import { Entity, Enum, IdentifiedReference, OneToOne, PrimaryKey, Property } from '@mikro-orm/core';
import { SentimentalEnum } from '@/data/enums/sentimental.enum';
import { EmpresaEntity } from '@/data/entities/empresa.entity';

@Entity()
export class NoticiasEntity {
  @PrimaryKey({ unique: true })
  url!: string;

  @Property()
  titulo!: string;

  @Property()
  corpo!: string;

  @Property()
  date: Date;

  @Enum()
  analise: SentimentalEnum.Neutro;

  @OneToOne(() => EmpresaEntity)
  empresa: IdentifiedReference<EmpresaEntity>;
}
