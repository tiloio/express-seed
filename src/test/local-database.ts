import * as fs from 'fs';
import * as path from 'path';
import * as PouchDB from 'pouchdb';
import * as express from 'express';
import { Server } from 'http';
import { Database } from '../database';

const LOCAL_DATABASE_PATH = './database';
const SERVER_PORT_FILE_PATH = path.join(LOCAL_DATABASE_PATH, 'serverport');

function getLocalDBServerPort(): number {
    return Number.parseInt(fs.readFileSync(SERVER_PORT_FILE_PATH, { encoding: 'UTF-8' }));
}

async function createLocalDatabase(databasePort: number | undefined = undefined): Promise<Server> {
    if (!fs.existsSync(LOCAL_DATABASE_PATH)) {
        fs.mkdirSync(LOCAL_DATABASE_PATH);
    }

    const expressPouchDb = require('express-pouchdb');
    const app: express.Application = express();
    app.use('/', expressPouchDb(PouchDB.defaults({
        prefix: LOCAL_DATABASE_PATH,
    }), { logPath: path.join(LOCAL_DATABASE_PATH, 'log.txt') }));

    const localDatabaseServer = await app.listen(databasePort || 0);
    const addressInformation: any = localDatabaseServer.address();
    fs.writeFileSync(SERVER_PORT_FILE_PATH, addressInformation.port);
    console.log(`Created local database sever http://localhost:${addressInformation.port}.`);

    return localDatabaseServer;
}


async function clearDatabase() {
    const database = await Database.getInstance();
    const allDocsBody = await database.list({ include_docs: true });
    const allDocsMarkedToBeDeleted = allDocsBody.rows.map(obj => {
        (obj as any)._deleted = true;
        return obj;
    });
    await database.bulk({ docs: allDocsMarkedToBeDeleted });
}

export {
    getLocalDBServerPort,
    createLocalDatabase,
    clearDatabase
}