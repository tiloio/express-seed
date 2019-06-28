import * as express from 'express';
import * as helmet from 'helmet';
import { V1Route } from './api/v1/routes/v1.route';
import { SERVER_PORT } from './config/config';
import { Logger } from './config/logger';
import { HelloWorldService } from './services/hello-world.service';

async function start(): Promise<void> {
    await HelloWorldService.init();

    const app: express.Application = express();
    app.use(helmet());

    app.use('/', new V1Route().router);

    await app.listen(SERVER_PORT);
}

Logger.appStarting();
start()
    .then(Logger.appRunning)
    .catch(Logger.appStartFailed);
