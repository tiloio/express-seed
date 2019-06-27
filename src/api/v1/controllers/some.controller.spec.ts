import { SomeController } from './some.controller';
import { HelloWorldService } from '../../../services/hello-world.service';
import { clearDatabase } from '../../../test/local-database';

afterEach(async () => clearDatabase());

describe('SomeController', () => {
	describe('someMethod', () => {
		it('returns hello world from database', async () => {
			HelloWorldService.init();
			const controller = new SomeController();

			expect(await controller.someMethod()).toBe('Hello World from the Database!')
		});
	});
});