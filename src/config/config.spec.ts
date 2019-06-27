import { Config, LOG_LEVEL, ENVIRONMENT } from './config'

describe('config', () => {
    describe('setEnvironment', () => {

        it('sets the environment', () => {
            Config.setEnvironment('test');

            expect(LOG_LEVEL).toBe('debug');
            expect(ENVIRONMENT).toBe('test');
        });

        it('environment cant be set twice', () => {
            Config.setEnvironment('test');

            try {
                Config.setEnvironment('development');

            } catch (error) {
                expect(error).toBeTruthy();
            }

            expect.assertions(1);
        })
    });
});