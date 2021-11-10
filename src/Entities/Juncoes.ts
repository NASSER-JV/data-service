import {Entity, IdentifiedReference, OneToOne, PrimaryKey, Property} from "@mikro-orm/core";
import {Empresa} from "./Empresa";


@Entity()
export class Juncoes {

    @PrimaryKey({ unique: true })
    id!: number;

    @Property()
    dataInicio!: Date;

    @Property()
    dataFim!: Date;

    @OneToOne(() => Empresa)
    empresa: IdentifiedReference<Empresa>;

}
