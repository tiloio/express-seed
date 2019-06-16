let LOG_LEVEL = 'info';
let ENVIRONMENT: string | undefined = process.env.NODE_ENV;
let SERVER_PORT: number | undefined = process.env.SERVER_PORT ? Number.parseInt(process.env.SERVER_PORT) : 8080;

export class Config {
    static setEnvironment(environment?: string) {
        if (ENVIRONMENT && ENVIRONMENT !== environment) {
            throw new Error(`Can't set envrionment to ${environment}. The environment is already set to ${ENVIRONMENT}.`);
        }

        ENVIRONMENT = environment as string;

        switch (environment) {
            case "local":
                LOG_LEVEL = process.env.LOG_LEVEL || 'debug';
                break;
            case "test":
                LOG_LEVEL = 'debug';
                break;
            case "production":
                break;
            default:
                console.log(`Envrionment ${environment} not specified.`);
        }
    }
}

Config.setEnvironment(ENVIRONMENT);


export { LOG_LEVEL, ENVIRONMENT, SERVER_PORT };