import * as express from 'express'
import { SomeRoute } from './some-route/some.route';

export class V1Route {
	router: express.Router;

	constructor() {
		this.router = express.Router();
		this.init();
	}

	private init(): void {
		this.router.use('/v1', new SomeRoute().router);
	}
}