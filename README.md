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

> For more information visit [https://nodejs.org/en/docs/guides/debugging-getting-started/](https://nodejs.org/en/docs/guides/debugging-getting-started/).

## Tests & testing

```bash
# run tests 🎈
yarn test
# or
npm test

# run tests 🎈 with watcher 👀
yarn test:watch
# or
npm run test:watch

# run tests 🎈 with watcher 👀 on only changed git files 🎳
yarn test:watchChanged
# or
npm run test:watchChanged
```

> For more information visit [https://jestjs.io](https://jestjs.io).

### Test structure

In `./src/test` is a `TestWebService.ts` which can be used to run integration tests.

## environment variables

> The file [`./src/config.ts`](./src/config.ts) describes the environment variables.

For passwords, database connections, log level and other stuff we need to set different values on different environment.
The test environment should not use the production database and otherwise.

To set your environment variables you can just set them in you system:

```bash
# windows
set NODE_ENV=production
# mac
export NODE_ENV=production
# linux
export NODE_ENV=production
```

Or do it like we do it in the `package.json` for the `start` or `start:production` task:

```bash
# yarn
yarn run cross-env LOG_LEVEL=test yarn start
# npm
npm install -g cross-env
cross-env LOG_LEVEL=test npm start
```

## database 🛢

We use [apache couchdb](http://couchdb.apache.org/) as a database.
> On local or test environment we start an [express-pouchdb](https://github.com/pouchdb/pouchdb-server) instance which acts like a couchdb server.

You have to set the environment variables to call a real couchdb in production:

- DATABASE_URL
- DATABASE_PORT
- DATABASE_NAME

> The url should contain the password and username, for example `'http://admin:password@otherhost.com'`.

Just call `await Database.getInstance()` from [`./src/database.ts`](./src/database.ts) file to recieve an instance of the database.

> To work with the database we use CouchDB nano, visit [https://github.com/apache/couchdb-nano ](https://github.com/apache/couchdb-nano) for more information.
