import * as express from 'express';
import { V1Route } from './api/v1/routes/v1.route';
import { SERVER_PORT } from './config/config';
import { Logger } from './config/logger';


async function start(): Promise<void> {
    const app: express.Application = express();

    app.use('/', new V1Route().router);

    await app.listen(SERVER_PORT);
}

Logger.appStarting();
start()
    .then(Logger.appRunning)
    .catch(Logger.appStartFailed);

