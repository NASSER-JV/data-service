import { IDatabaseDriver, Options } from '@mikro-orm/core';

const config: Options<IDatabaseDriver> = {
    baseDir: __dirname,
    entities: ['./dist/src/entities'],
    entitiesTs: ['./src/entities'],
    dbName: process.env.DB_NAME,
    type: 'postgresql',
    password: process.env.DB_PASS,
    port: parseInt(process.env.DB_PORT || '', 10) || 5432,
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    debug: true,
    migrations: {
        tableName: 'migrations',
        dropTables: true,
        path: './src/infrastructure/data/migrations',
        pattern: /^[\w-]+.(js|ts)$/,
        transactional: true,
        allOrNothing: true,
        emit: 'ts',
        fileName: (timestamp) => {
            let migrationName = '';

            const namePropertyIndex = process.argv.findIndex((value) => value === '--name');

            if (namePropertyIndex > -1) {
                const nameValueIndex = namePropertyIndex + 1;
                migrationName = process.argv[nameValueIndex] || '';
            }

            return `Migration${timestamp}${migrationName}`;
        },
    },
};

export default config;
