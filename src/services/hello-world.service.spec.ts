import { Database } from "../database";
import { HelloWorldService } from "../services/hello-world.service";
import { clearDatabase } from "../test/local-database";

afterEach(async () => clearDatabase());

describe('HelloWorldService', () => {
    describe('init', () => {
        it('saves hello world in database', async () => {

            HelloWorldService.init();

            const database = await Database.getInstance();
            const expectedMessage = 'Hello World from the Database!';
            const result = await database.get('myid');

            expect(result.message).toBe(expectedMessage)
        });
    });
});
