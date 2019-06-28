import { SomeController } from './some.controller';
import { HelloWorldService } from '../../../services/hello-world.service';
import { LocalDatabase } from '../../../test/local-database';

afterEach(async () => await LocalDatabase.clear());

describe('SomeController', () => {
	describe('someMethod', () => {
		it('returns hello world from database', async () => {
			await HelloWorldService.init();
			const controller = new SomeController();

			expect(await controller.someMethod()).toBe('Hello World from the Database!')
		});
	});
});