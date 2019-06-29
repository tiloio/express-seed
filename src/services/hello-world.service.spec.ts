import { Database } from "../database";
import { LocalDatabase } from "../test/local-database";
import { LocalServer } from "../test/local-server";

afterEach(async () => await LocalDatabase.clear());

describe('HelloWorldService', () => {
    describe('on app start', () => {
        it('saves hello world in database and does not fail on multiple runs', async () => {
            await LocalServer.run();
            await LocalServer.run();

            const database = await Database.getInstance();
            const expectedMessage = 'Hello World from the Database!';
            const result = await database.get('myid');

            expect(result.message).toBe(expectedMessage)
        });
    });
});
