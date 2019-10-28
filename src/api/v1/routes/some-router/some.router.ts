import * as express from 'express';
import { SomeController } from '../../controllers/some.controller';
import { asyncMiddleware } from '../../../async-middleware';
import { AbstractRouter } from '../router.abstract';

export class SomeRouter extends AbstractRouter {
	private controller = new SomeController();

	protected init(): void {
		this.router.get('/', asyncMiddleware(
			async (req: express.Request, res: express.Response, next: express.NextFunction): Promise<void> => {
				res.send(await this.controller.someMethod())
			})
		);
	}
}