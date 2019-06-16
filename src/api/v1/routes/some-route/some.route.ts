import * as express from 'express';
import { SomeController } from '../../controllers/some.controller';

export class SomeRoute {
	router: express.Router;
	private controller: SomeController;

	constructor() {
		this.router = express.Router();
		this.controller = new SomeController();
		this.init();
	}

	private init(): void {
		this.router.get('/', (req: express.Request, res: express.Response) => {
			res.send(this.controller.someMethod())
		});
	}

}