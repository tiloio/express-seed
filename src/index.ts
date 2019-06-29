import * as express from 'express';
import * as helmet from 'helmet';
import { V1Route } from './api/v1/routes/v1.route';
import { SERVER_PORT, ENVIRONMENT } from './config/config';
import { Logger } from './config/logger';
import { HelloWorldService } from './services/hello-world.service';
import { Environment } from './config/config.enums';

export async function start(): Promise<express.Application> {
    await HelloWorldService.init();

    const app: express.Application = express();
    app.use(helmet());

    app.use('/', new V1Route().router);

    app.locals.server = await app.listen(SERVER_PORT);

    return app;
}

if (ENVIRONMENT != Environment.test) {
    Logger.appStarting();
    start()
        .then(Logger.appRunning)
        .catch(Logger.appStartFailed);
}