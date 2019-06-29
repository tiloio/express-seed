import { LocalDatabase } from "./local-database";
import { LocalServer } from "./local-server";

/**
 *  Here you can define global test settings, like a global afterEach.
 * 
 *  This file is defined in setupFilesAfterEnv in the jest.config.js file.
 */

afterAll(async () => {
    LocalServer.stop();
    LocalDatabase.destroy();
});
