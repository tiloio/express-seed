let LOG_LEVEL = 'info';
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
    LOG_LEVEL = process.env.LOG_LEVEL || 'debug';
    DATABASE_URL = process.env.DATABASE_URL || 'http://localhost';
    DATABASE_PORT = process.env.DATABASE_PORT ? Number.parseInt(process.env.DATABASE_PORT) : 3000;
    DATABASE_NAME = 'express-seed';
}

function createTestEnvironment() {
    SERVER_PORT = 8080;
    LOG_LEVEL = 'debug';
    DATABASE_URL = 'YOUR_DATABASE_URL';
    DATABASE_PORT = 3000;
    DATABASE_NAME = 'express-seed';
}

export class Config {
    static setEnvironment(environment?: string) {
        if (ENVIRONMENT && ENVIRONMENT !== environment) {
            throw new Error(`Can't set envrionment to ${environment}. The environment is already set to ${ENVIRONMENT}.`);
        }

        ENVIRONMENT = environment as string;

        switch (environment) {
            case "test":
                createTestEnvironment();
                break;
            case "local":
                createLocalEnvironment();
                break;
            case "production":
                createProductionEnvironment();
                break;
            default:
                console.log(`Envrionment ${environment} not specified.`);
        }
    }
}

Config.setEnvironment(ENVIRONMENT);

