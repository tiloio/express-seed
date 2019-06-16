import * as express from 'express';
import { V1Route } from './api/v1/routes/v1.route';
import { ENVIRONMENT, LOG_LEVEL, SERVER_PORT } from './config';

(async () => {
    logAppStarting();

    try {
        const app: express.Application = express();

        app.use('/', new V1Route().router);

        await app.listen(SERVER_PORT);

        logAppRunning();

    } catch (error) {
        logAppStartFailed(error);
    }
})();

function logAppStarting() {
    console.log('\n' +
        '\x1b[33m' + // set output color to yellow
        'Starting app...' +
        '\x1b[0m' + // reset output color     
        '\n');
}

function logAppRunning() {
    console.log('\n' +
        '\x1b[32m' + // set output color to green
        `Application is running on http://localhost:${SERVER_PORT} 
             in ENVIRONMENT ${ENVIRONMENT} 
             with LOG_LEVEL ${LOG_LEVEL}.` +
        '\x1b[0m' + // reset output color
        '\n');
}

function logAppStartFailed(error: any) {
    console.error('\n' +
        '\x1b[31m' + // set output color to red
        'ERROR ON APPLICATION STARTUP IN ./index.ts:' +
        '\n', error);
}