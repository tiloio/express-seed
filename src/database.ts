
import { ENVIRONMENT, DATABASE_URL, DATABASE_PORT, DATABASE_NAME } from './config/config';
import * as Nano from 'nano';
import { createLocalDatabase} from './test/local-database';

import { Environment } from './config/config.enums';

export class Database {

    private static instance: Nano.DocumentScope<any> | undefined;
    private static serverInstance: Nano.ServerScope | undefined;

    static async getInstance(): Promise<Nano.DocumentScope<any>> {
        if (this.instance) return this.instance;

        let databasePort = DATABASE_PORT;

        if (ENVIRONMENT === Environment.local) {
            databasePort = ((await createLocalDatabase(DATABASE_PORT)).address() as any ).port;
        }

        const nano: Nano.ServerScope = <Nano.ServerScope>Nano(`${DATABASE_URL}:${databasePort}`);
        const actualDatabases = await nano.db.list();

        if (!actualDatabases.some(database => database === DATABASE_NAME)) {
            await nano.db.create(DATABASE_NAME);
        }

        console.log(
            `Initilized ${DATABASE_NAME} database with sever ${DATABASE_URL}:${databasePort}. 
            Other databases on the server: ${actualDatabases.join(', ')}`
        );

        this.serverInstance = nano;
        this.instance = nano.db.use(DATABASE_NAME);

        return this.instance;
    }

    static get server(): Nano.ServerScope | undefined {
        return this.serverInstance;
    }

    static disconnect() {
        this.instance = undefined;
        this.serverInstance = undefined;
    }

}

