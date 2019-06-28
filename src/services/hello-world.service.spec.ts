import { Database } from "../database";
import { HelloWorldService } from "../services/hello-world.service";
import { LocalDatabase } from "../test/local-database";

afterEach(async () => await LocalDatabase.clear());

describe('HelloWorldService', () => {
    describe('init', () => {
        it('saves hello world in database and does not fail on multiple runs', async () => {

            await HelloWorldService.init();
            await HelloWorldService.init();

            const database = await Database.getInstance();
            const expectedMessage = 'Hello World from the Database!';
            const result = await database.get('myid');

            expect(result.message).toBe(expectedMessage)
        });
    });
});

