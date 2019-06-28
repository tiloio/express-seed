import { LocalDatabase } from "./local-database";

/**
 *  Here you can define global test settings, like a global afterEach.
 * 
 *  This file is defined in setupFilesAfterEnv in the jest.config.js file.
 */

afterAll(async () => {
    LocalDatabase.destroy();
});
