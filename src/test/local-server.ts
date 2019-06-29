import { Server } from 'http';
import { AddressInfo } from 'net';
import { start } from '../index';
import { Application } from 'express';

export class LocalServer {
	private static application: Application | null;
	private static server: Server | null;

	static get port(): number {
		if (!this.server) return 0;
		return (this.server.address() as AddressInfo).port;
	}

	static get app(): Application {
		if(!this.application) throw Error('App is not started!');
		return this.application;
	}

	static async run() {
		if (this.server) this.stop();
		const hrstart = process.hrtime();
		this.application = await start();
		this.server = this.application.locals.server;
		console.log(`Local Server started at port ${this.port}. Took: ${process.hrtime(hrstart)[1] / 1000000}ms.`);
	}

	static stop(): void {
		if (!this.server) return;
		this.server.close();
		this.application = null;
		this.server = null;
	}
}