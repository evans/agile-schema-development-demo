# Agile Schema Development Demo

This repo contains the code used to in the demo of the talk, Agile Schema
Development given by [@evanshauser](https://twitter.com/evanshauser) at GraphQL
Summit 2019 and Apollo Day Seattle 2019.

For more about the talks, please see:

* [Talk at GraphQL Summit](https://www.youtube.com/watch?v=XAL8MiDN-O0&list=PLpi1lPB6opQyraZSmwFre_FpL00_3nTzV&index=53)
* [Talk at Apollo Day Seattle](https://www.youtube.com/watch?v=28si95VO4Ws&list=PLpi1lPB6opQznIY72BAmWtGm50D-WkYxv&index=3)
* [Slides](https://www.slideshare.net/EvansHauser/agile-schema-development)

To see the final state of the frontend shown during the demo, see [this commit](https://github.com/evans/agile-schema-development-demo/tree/final-demo-state).

# Inspiration: Space Explorer

This demo is inspired by the fullstack app built in the [Apollo
tutorial](http://apollographql.com/docs/tutorial/introduction.html). 🚀

## Installation

To run the app, run these commands in two separate terminal windows from the root:

```bash
cd server && npm i && npm start
```

and

```bash
cd client && npm i && npm start
```

If you would like to run this application in Heroku, you may fork it and enable the [Heroku github extension](https://devcenter.heroku.com/articles/github-integration)

### Metrics Cron

The metrics cron uses a load testing framework, [artillery](https://artillery.io/), to run mock
traffic against a GraphQL endpoint running the server code in this repo.  To
run the metrics cron locally, change the endpoint to point at your production
endpoint inside of the .yml files, then run:

```bash
cd metrics-cron && npm start
```

In order to publish the application to Heroku, run the following inside of the root of this repo:

```bash
git subtree push --prefix metrics-cron heroku master
```

### Schema history

The `schema-history` directory contains code to publish a mock history of the schema. This can be run with:

```bash
cd schema-history && npm i && npm run gen-history
```

### Federation

The `federation` directory contains an example of federating the backend of the space explorer application. To run the application, the services(`npm run start:services`) must be started before the gateway(`npm start`)

In one line, it can be started by running:

```bash
cd federation && npm i && npm run start:services & sleep 5 && npm start
```
