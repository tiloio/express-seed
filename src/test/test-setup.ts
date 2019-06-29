import { LocalDatabase } from "./local-database";
import { LocalServer } from "./local-server";

/**
 *  Here you can define global test settings, like a global afterEach.
 * 
 *  But be patient: you are in a single test scope. Each test file in jest is a own process and scope
 *  That means you can't share variables, classes, constants or something else between two test f-iles.
 *  This file is defined in setupFilesAfterEnv in the jest.config.js file.
 */

afterAll(async () => {
    LocalServer.stop();
    LocalDatabase.destroy();
});
