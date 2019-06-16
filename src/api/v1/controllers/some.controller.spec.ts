import { SomeController } from './some.controller';
import { Database } from '../../../database';

jest.mock('../../../database');

describe('SomeController', () => {
	describe('someMethod', () => {
		it('returns something from database', async() => {
			const controller = new SomeController();

			const mockGetInstance = jest.fn();
			mockGetInstance.mockResolvedValue('worked');

			Database.getInstance = mockGetInstance.bind(Database);
			// TODO add test example for database.

			expect(await controller.someMethod()).toBe('Hello World!')
		});
	});
});