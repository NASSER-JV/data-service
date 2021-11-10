import {Injectable} from '@nestjs/common';
import {ConfigService} from "@nestjs/config";
import {Connection, IDatabaseDriver, MikroORM} from "@mikro-orm/core";
import {Empresa} from "../Entities/Empresa";
import {Noticias} from "../Entities/Noticias";
import {Juncoes} from "../Entities/Juncoes";

@Injectable()
export class DatabaseService {
    constructor(private configService: ConfigService) {}
    async initDatabase(): Promise<MikroORM<IDatabaseDriver<Connection>>> {
        const connectionString = this.configService.get<string>('DATABASEURL');
        const db = this.configService.get<string>('DATABASENAME');
        return await MikroORM.init({
            entities: [Empresa, Noticias, Juncoes],
            dbName: db,
            type: 'postgresql',
            clientUrl: connectionString,
        });
    }
}
