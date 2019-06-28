import * as fs from 'fs';
import * as path from 'path';
import * as PouchDB from 'pouchdb';
import * as express from 'express';
import { Server } from 'http';
import { Database } from '../database';
import { ROOT_DIRECTORY, ENVIRONMENT } from '../config/config';
import { Environment } from '../config/config.enums';
PouchDB.plugin(require('pouchdb-adapter-memory'));


export class LocalDatabase {

    static readonly LOCAL_DATABASE_PATH = path.join(ROOT_DIRECTORY, 'database');
    static readonly SERVER_PORT_FILE_PATH = path.join(LocalDatabase.LOCAL_DATABASE_PATH, 'serverport');
    static readonly PREFIX_PATH = path.join(LocalDatabase.LOCAL_DATABASE_PATH, 'local');

    private static databaseServerInstance: Server;

    static async create(databasePort: number | undefined = undefined): Promise<Server> {
        const hrstart = process.hrtime()
        if (!fs.existsSync(this.LOCAL_DATABASE_PATH)) {
            fs.mkdirSync(this.LOCAL_DATABASE_PATH);
        }

        const isInMemory = ENVIRONMENT == Environment.test;
        const database = isInMemory ?
            PouchDB.defaults({ prefix: this.PREFIX_PATH, adapter: 'memory' }) :
            PouchDB.defaults({ prefix: this.PREFIX_PATH });

        const expressPouchDb = require('express-pouchdb');
        const app: express.Application = express();
        app.use('/', expressPouchDb(database,
            {
                logPath: path.join(this.LOCAL_DATABASE_PATH, 'log.txt'),
                mode: 'minimumForPouchDB',
                inMemoryConfig: true
            }));

        this.databaseServerInstance = await app.listen(databasePort || 0);
        const addressInformation: any = this.databaseServerInstance.address();
        // fs.writeFileSync(this.SERVER_PORT_FILE_PATH, addressInformation.port);
        console.log(`Created ${isInMemory ? 'inMemory' : 'local'} database ` +
            `sever http://localhost:${addressInformation.port}. Took: ${process.hrtime(hrstart)[1] / 1000000}ms.`);

        return this.databaseServerInstance;
    }

    static async clear(): Promise<void> {
        const database = await Database.getInstance();
        const allDocsBody = await database.list({ include_docs: false });
        const allDocsMarkedToBeDeleted = allDocsBody.rows.map(obj => {
            return {
                _deleted: true,
                _id: obj.id,
                _rev: obj.value.rev
            };
        });
        await database.bulk({ docs: allDocsMarkedToBeDeleted });
    }

    static async destroy(): Promise<void> {
        if (!this.databaseServerInstance) return;
        this.databaseServerInstance.close();
    }

}