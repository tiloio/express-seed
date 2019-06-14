# express-seed 🌱

Seed project for a node.js express application with typescript.

## Quick introduction

```bash
# install 🧷
yarn
# or
npm i

# run 🏃🏾‍♀️
yarn start
# or
npm start

# run 🏃🏾‍♂️ with watcher 👀
yarn start:watch
# or
npm run start:watch

# build 🚧
yarn build
# or
npm run build

# run 🚀 in production
yarn start:production
# or
npm run start:production
```

## Debug

If you start the application a debugging web socket is started / an inspector enabled:

```bash
$ yarn start:watch
yarn run v1.15.2
$ nodemon
[nodemon] 1.19.1
[nodemon] to restart at any time, enter `rs`
[nodemon] watching: C:\src\express-seed\src/**/*
[nodemon] starting `npm start`

> express-seed@1.0.0 start C:\src\express-seed
> node --inspect=5858 -r ts-node/register ./src/index.ts

Debugger listening on ws://127.0.0.1:5858/51141c14-bb7e-4bae-9932-ef1ceadb49cd # <- debugger
For help, see: https://nodejs.org/en/docs/inspector

Application is running on http://localhost:8080
```

For more information visit https://nodejs.org/en/docs/guides/debugging-getting-started/.

## Tests & testing


```bash
# run tests 🎈
yarn test
# or
npm test

# run tests 🎈 witch watcher 👀
yarn test:watch
# or
npm run test:watch

# run tests 🎈 witch watcher 👀 on only changed git files 🎳
yarn test:watchChanged
# or
npm run test:watchChanged
```

For more information visit https://jestjs.io.

### Test structure

In `./src/test` is a `TestWebService.ts` which can be used to run integration tests.