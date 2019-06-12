import * as express from 'express';
import { SomeRoute } from './some-route/some.route';
import { V1Route } from './v1.route';

jest.mock('express');
jest.mock('./some-route/some.route');

describe('v1 route', () => {
	let expressMock: jest.ModuleMocker = express;
	let useSpy: jest.Mock;
	// @ts-ignore
	let expressRouteStub: jest.Mock = express.Router;
	let someRouteStub: jest.ModuleMocker = SomeRoute;

	beforeEach(() => {
		expressMock.mockClear();
		expressRouteStub.mockClear();
		useSpy = jest.fn();
		expressRouteStub.mockImplementation(() => {
			return {
				use: useSpy
			}
		});

		const routeMock = {
			router: 'SOME V1 ROUTE'
		};

		someRouteStub.mockClear();
		someRouteStub.mockImplementation(() => routeMock);
	});

	it('uses some route', () => {
		const someRouteMock = {
			router: 'WEATHER ROUTE'
		};
		someRouteStub.mockImplementation(() => someRouteMock);

		new V1Route();

		expect(containsRoute(someRouteMock)).toBe(true);
	});

	function containsRoute(expectedRoute: any): string | boolean {
		let result: string | boolean = `App does not use the expected route [ ${expectedRoute.router} ]`;

		useSpy.mock.calls.forEach((call: any[]) => {
			if (result === true && call[1] === expectedRoute.router) result = `The route [ ${expectedRoute.router} ] is used twice or more!`;
			if (call[1] === expectedRoute.router) result = true;
		});
		return result
	}


	it('binds all routes to /v1', () => {
		new V1Route();

		let result: string | boolean = true;
		useSpy.mock.calls.forEach((call: any[]) => {
			if (call[0] !== '/v1') result = `There is a route bound to ${call[0]} instead of /api!`;
		});

		expect(result).toBe(true);
	});
});