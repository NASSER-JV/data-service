import {Entity, Enum, IdentifiedReference, OneToOne, PrimaryKey, Property} from "@mikro-orm/core";
import {SentimentalEnum} from "../Data/SentimentalEnum";
import {Empresa} from "./Empresa";


@Entity()
export class Noticias {

    @PrimaryKey({ unique: true })
    url!: string;

    @Property()
    titulo!: string;

    @Property()
    corpo!: string;

    @Property()
    date: Date;

    @Enum({ default: SentimentalEnum.Neutro })
    analise: SentimentalEnum;

    @OneToOne(() => Empresa, empresa => empresa.id)
    empresaId: IdentifiedReference<Empresa>;
}
