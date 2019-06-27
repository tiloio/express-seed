import { Database } from "../../../database";

export class SomeController {
	async someMethod(): Promise<string> {
		const database = await Database.getInstance();
		return (await database.get('myid')).message;
	}
}