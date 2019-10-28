import * as request from 'supertest';
import { LocalServer } from '../../../../test/local-server';

describe('Some Router', () => {

	beforeAll(async () => {
		await LocalServer.run();
	});

	describe('GET /v1', () => {
		it('gets hello world from database', async () => {
			const response = await request(LocalServer.app).get('/v1');
			expect(response.status).toEqual(200);
			expect(response.text).toBe('Hello World from the Database!')
		});
	});
});
