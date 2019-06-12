import * as express from 'express';
import * as http from "http";

export class TestWebService {
	private service: express.Application;
	private server: http.Server;

	constructor(private route: any) {
		this.service = express();
		this.service.use('/', route.router);
		this.server = this.service.listen(0);
	}

	getServerPort(): number {
		const addressInformation: any = this.server.address();
		return addressInformation.port;
	}

	stopServer(): void {
		this.server.close();
	}
}