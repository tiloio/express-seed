import { Database } from "../database";

export class HelloWorldService {

        static async init() {
                const database = await Database.getInstance();

                try {
                        await database.get("myid");
                } catch (error) {
                        if (error.statusCode != 404) throw error;
                        await database.insert(({ _id: 'myid', message: 'Hello World from the Database!' }));
                }
        }
}
