import * as request from 'supertest';
import { SomeController } from '../../controllers/some.controller';
import { SomeRoute } from './some.route';
import { TestWebService } from '../../../../test/test-web.service';

jest.mock('../../controllers/some.controller');

describe('Some Route', () => {
	let testWebService: TestWebService;
	let controllerFake: jest.ModuleMocker;
	let spy: jest.Mock;
	let route: SomeRoute;

	beforeAll(() => {
		controllerFake = SomeController;
		spy = jest.fn();
		controllerFake.mockImplementation(() => {
			return {
				someMethod: spy
			}
		});
		route = new SomeRoute();
		testWebService = new TestWebService(route);
	});

	afterAll(() => {
		testWebService.stopServer();
	});

	it('calls controller', async () => {
		spy.mockReturnValue('HODOR');

		const response = await request('http://localhost:' + testWebService.getServerPort()).get('/');
		expect(spy).toHaveBeenCalledTimes(1);
		expect(response.status).toEqual(200);
		expect(response.text).toBe('HODOR');
	});
});