import * as express from 'express';
import {TestWebService} from './test-web.service';

jest.mock('express');

describe('TestWebService', () => {
	let expressMock: jest.ModuleMocker = express;
	let useSpy: jest.Mock;
	let listenSpy: jest.Mock;

	beforeEach(() => {
		expressMock.mockClear();
		useSpy = jest.fn();
		listenSpy = jest.fn();
		expressMock.mockReturnValue({use: useSpy, listen: listenSpy})
	});

	it('starts a express instance with random free port for given route', () => {
		const expectedRoute = {router: 'some fancy express route'};

		new TestWebService(expectedRoute);

		expect(expressMock).toHaveBeenCalledTimes(1);
		expect(useSpy).toHaveBeenCalledTimes(1);
		expect(useSpy).toHaveBeenCalledWith('/', expectedRoute.router);
		expect(listenSpy).toHaveBeenCalledTimes(1);
		expect(listenSpy).toHaveBeenCalledWith(0);
	});

	describe('getServerPort', () => {
		it('returns current server port', () => {
			const expectedRandomPort = 1337;
			const fakeServer = {
				address: () => {
					return {
						port: expectedRandomPort
					}
				}
			};
			listenSpy.mockReturnValue(fakeServer);
			const testWebService = new TestWebService({router: 'some fancy express route'});

			expect(testWebService.getServerPort()).toBe(expectedRandomPort);
		});
	});

	describe('stopServer', () => {
		it('closes the server', () => {
			const closeSpy = jest.fn();
			const fakeServer = {
				address: () => {
					return {
						port: 1337
					}
				},
				close: closeSpy
			};
			listenSpy.mockReturnValue(fakeServer);

			new TestWebService({router: 'some fancy express route'}).stopServer();

			expect(closeSpy).toHaveBeenCalledTimes(1);
		});
	});
});