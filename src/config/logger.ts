import { ENVIRONMENT, LOG_LEVEL, SERVER_PORT } from "./config";

export class Logger {

    static get timestamp(): String {
        return '\x1b[90m' + // set output color to gray
            ' ' +
            new Date().toISOString() +
            '\x1b[0m'; // reset output color   
    }

    static info(text: string) {
        console.log(text, this.timestamp);
    }

    static appStarting() {
        console.log('\n' +
            '\x1b[33m' + // set output color to yellow
            'Starting app... ' +
            Logger.timestamp +
            '\n');
    }
    static appRunning() {
        console.log('\n' +
            '\x1b[32m' + // set output color to green
            `Application is running on http://localhost:${SERVER_PORT} 
                 in ENVIRONMENT ${ENVIRONMENT} 
                 with LOG_LEVEL ${LOG_LEVEL}.` +
            Logger.timestamp +
            '\n');
    }

    static appStartFailed(error: any) {
        console.error('\n' +
            '\x1b[31m' + // set output color to red
            'ERROR ON APPLICATION STARTUP IN ./index.ts:' +
            Logger.timestamp +
            '\n', error);
    }
}