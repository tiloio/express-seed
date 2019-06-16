import * as express from 'express';
import { V1Route } from './api/v1/routes/v1.route';
import { ENVIRONMENT, LOG_LEVEL, SERVER_PORT } from './config';

const app: express.Application = express();

app.use('/', new V1Route().router);

app.listen(SERVER_PORT, () => {
    console.log('\n',
        '\x1b[32m', // set output color to green
        `Application is running on http://localhost:${SERVER_PORT} 
            in ENVIRONMENT ${ENVIRONMENT} 
            with LOG_LEVEL ${LOG_LEVEL}.`,
        '\x1b[0m' // reset output color
    );
});
