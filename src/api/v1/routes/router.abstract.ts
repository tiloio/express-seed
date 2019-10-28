import * as express from 'express';

export abstract class AbstractRouter {
    router: express.Router;

    constructor() {
        this.router = express.Router();
        this.init();
    }

    protected abstract init(): void;

}