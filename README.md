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

We think you should write **less unit tests** and **more integration tests**. 

> Spotify is using the *Microservice Testing Hondeycomb* for that. Read https://labs.spotify.com/2018/01/11/testing-of-microservices/ for more information.

### requests and endpoints in the tests

To make real requests in your tests you can use the  [`./src/test/local-server.ts`](./src/test/local-server.ts).

Just call `await LocalServer.run();` and your application gets started. Do this `await request('http://localhost:' + LocalServer.port).get('/v1');` to make a request against the started application.

> The [`./src/api/v1/routes/some-route/some.route.spec.ts`](./src/api/v1/routes/some-route/some.route.spec.ts) file shows how to use the local-server.

### database 🛢 in the test 

To use the database in your integration test you can get the instance with `await Database.getInstance();`.

> Look at [`./src/services/hello-world.service.spec.ts`](./ssrc/services/hello-world.service.spec.ts) for a database example.

### clean up

The clean up of the database and application service which are used in the tests runs automatically.

To clean the databse in between single runs you can call `await LocalDatabase.clear()`.

> In the [`src/test/test-setup.ts`](src/test/test-setup.ts) file the `LocalServer.stop();` and `LocalDatabase.destroy();` gets called after each test file.

## environment variables

> The file [`./src/config/config.ts`](./src/config/config.ts) describes the environment variables.

For passwords, database connections, log level and other stuff we need to set different values on different environments.
The test environment should not use the production database and otherwise.

To set your environment variables you can just set them in your system:

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

## parsing (JSON, UrlEncode, ...) 🔬

To parse `application/json` or `application/x-www-form-urlencoded` requests, we use the expressjs/body-parser.

> For more information and how to use it visit https://github.com/expressjs/body-parser.

## security 🗝

 The application is secured with helmet.js.

 > For more information visit https://helmetjs.github.io/.