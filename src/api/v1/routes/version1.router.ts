import { SomeRouter } from './some-router/some.router';
import { AbstractRouter } from './router.abstract';

export class Version1Router extends AbstractRouter {
	protected init(): void {
		this.router.use('/v1', new SomeRouter().router);
	}
}