import { Environment, LogLevel } from "./config.enums";
import * as path from 'path';

export const ROOT_DIRECTORY = path.join(__dirname, '..', '..');

let LOG_LEVEL: string = LogLevel.info;
let ENVIRONMENT: string | undefined = process.env.NODE_ENV;
let SERVER_PORT: number;
let DATABASE_URL: string;
let DATABASE_PORT: number;
let DATABASE_NAME: string;

export {
    LOG_LEVEL,
    ENVIRONMENT,
    SERVER_PORT,
    DATABASE_URL,
    DATABASE_PORT,
    DATABASE_NAME
};

function createProductionEnvironment() {
    SERVER_PORT = process.env.SERVER_PORT ? Number.parseInt(process.env.SERVER_PORT) : 80;
    DATABASE_URL = process.env.DATABASE_URL || 'YOUR_DATABASE_URL';
    DATABASE_PORT = process.env.DATABASE_PORT ? Number.parseInt(process.env.DATABASE_PORT) : 3000;
    DATABASE_NAME = 'express-seed';
}

function createLocalEnvironment() {
    SERVER_PORT = process.env.SERVER_PORT ? Number.parseInt(process.env.SERVER_PORT) : 8080;
    LOG_LEVEL = process.env.LOG_LEVEL || LogLevel.debug;
    DATABASE_URL = process.env.DATABASE_URL || 'http://localhost';
    DATABASE_PORT = process.env.DATABASE_PORT ? Number.parseInt(process.env.DATABASE_PORT) : 3454;
    DATABASE_NAME = 'express-seed';
}

function createTestEnvironment() {
    SERVER_PORT = 0;
    LOG_LEVEL = LogLevel.debug;
    DATABASE_URL = 'http://localhost';
    DATABASE_PORT = 0;
    DATABASE_NAME = 'express-seed';
}

export class Config {
    static setEnvironment(environment?: string) {
        if (ENVIRONMENT && ENVIRONMENT !== environment) {
            throw new Error(`Can't set envrionment to ${environment}. The environment is already set to ${ENVIRONMENT}.`);
        }

        ENVIRONMENT = environment as string;

        switch (environment) {
            case Environment.test:
                createTestEnvironment();
                break;
            case Environment.local:
                createLocalEnvironment();
                break;
            case Environment.production:
                createProductionEnvironment();
                break;
            default:
                console.log(`Envrionment ${environment} not specified.`);
        }
    }
}

Config.setEnvironment(ENVIRONMENT);
