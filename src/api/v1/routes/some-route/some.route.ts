import * as express from 'express';
import { SomeController } from '../../controllers/some.controller';
import { asyncMiddleware } from '../../../async-middleware';

export class SomeRoute {
	router: express.Router;
	private controller: SomeController;

	constructor() {
		this.router = express.Router();
		this.controller = new SomeController();
		this.init();
	}

	private init(): void {
		this.router.get('/', asyncMiddleware(
			async (req: express.Request, res: express.Response, next: express.NextFunction): Promise<void> => {
				res.send(await this.controller.someMethod())
			})
		);
	}

}