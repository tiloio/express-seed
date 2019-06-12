import * as express from 'express';
import { V1Route } from './api/v1/routes/v1.route';

const SERVER_PORT = 8080;
const app: express.Application = express();

app.use('/', new V1Route().router);

app.listen(SERVER_PORT);

console.log(`\nApplication started under: http://localhost:${SERVER_PORT}`)