import * as PouchDB from 'pouchdb';
import * as express from 'express';
import { ENVIRONMENT, DATABASE_URL, DATABASE_PORT, DATABASE_NAME } from './config';
import * as Nano from 'nano';
import * as fs from 'fs';

export class Database {

    private static instance: Nano.DocumentScope<any>;

    static async getInstance(): Promise<Nano.DocumentScope<any>> {
        if (this.instance) return this.instance;

        if (ENVIRONMENT === 'local') {
            Database.createLocalDatabase();
        }

        const nano: Nano.ServerScope = <Nano.ServerScope>Nano(`${DATABASE_URL}:${DATABASE_PORT}`);
        const actualDatabases = await nano.db.list();

        if (!actualDatabases.some(database => database === DATABASE_NAME)) {
            await nano.db.create(DATABASE_NAME);
        }

        console.log(
            `Initilized ${DATABASE_NAME} database with sever ${DATABASE_URL}:${DATABASE_PORT}. 
            Other databases on the server: ${actualDatabases.join(', ')}`
        );

        this.instance = nano.db.use(DATABASE_NAME);

        return this.instance;
    }

    private static createLocalDatabase() {
        const expressPouchDb = require('express-pouchdb');

        const databasePath = './database/';
        if (!fs.existsSync(databasePath)) {
            fs.mkdirSync(databasePath);
        }
        const app: express.Application = express();
        app.use('/', expressPouchDb(PouchDB.defaults({
            prefix: databasePath,
        }), { logPath: databasePath + '/log.txt' }));
        app.listen(DATABASE_PORT);
    }
}