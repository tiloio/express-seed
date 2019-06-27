import * as path from 'path';
import * as express from 'express';
import { V1Route } from './api/v1/routes/v1.route';
import { ENVIRONMENT, LOG_LEVEL, SERVER_PORT } from './config/config';
import { Logger } from './config/logger';

export const ROOT_DIRECTORY = path.join(__dirname, '..');

(async () => {
    Logger.appStarting();

    try {
        const app: express.Application = express();

        app.use('/', new V1Route().router);

        await app.listen(SERVER_PORT);

        Logger.appRunning();

    } catch (error) {
        Logger.appStartFailed(error);
    }
})();
