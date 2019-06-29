import { Server } from 'http';
import { AddressInfo } from 'net';
import { start } from '../index';

export class LocalServer {
	private static server: Server | null;

	static get port(): number {
		if (!this.server) return 0;
		return (this.server.address() as AddressInfo).port;
	}

	static async run() {
		if (this.server) this.stop();
        const hrstart = process.hrtime()
		this.server = await start();
		console.log(`Local Server started at port ${this.port}. Took: ${process.hrtime(hrstart)[1] / 1000000}ms.`);
	}

	static stop(): void {
		if (!this.server) return;
		this.server.close();
		this.server = null;
	}
}