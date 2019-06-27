import { Database } from "../database";

export class HelloWorldService {

     static async  init() {
        const database = await Database.getInstance();
        await database.insert(({ _id: 'myid', message: 'Hello World from the Database!' }));
    }

}