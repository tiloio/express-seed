import { SomeController } from './some.controller';

describe('SomeController', () => {
	describe('someMethod', () => {
		it('returns something', () => {
			const controller = new SomeController();

			expect(controller.someMethod()).toBe('Hello World!')
		});
	});
});