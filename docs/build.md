<img align="right" width="280" height="230" src="https://github.com/jimmy-e/mybord-server/blob/master/etc/assets/build.jpg">

# Build

This summarizes the build process for the MyBord codebase as well as any other config files. For
deploying to our production instance, please see the [deployment doc](https://github.com/jimmy-e/mybord-server/blob/master/docs/deployment.md).

## Table of Contents:

* [I. Babel](#i-babel)
* [II. ESLint](#ii-eslint)
* [III. Docker](#iii-docker)
* [IV. Yarn Commands](#iv-yarn-commands)
* [V. Env Vars](#v-env-vars)
* [VI. Running Locally](#vi-running-locally)

## I. Babel

Babel is a javascript compiler. Its configs can be found at
[.babelrc](https://github.com/jimmy-e/mybord/blob/master/.babelrc).

* [Documentation](https://babeljs.io/docs/en/)
* [Source Code](https://github.com/babel/babel)

## II. Eslint

Eslint is used to lint our javascript and TypeScript code. It's config file in the root 
directory, [`.eslintrc.js`](https://github.com/jimmy-e/mybord/blob/master/.eslintrc.js),
sets up our syntax rules, importing rules, and use of global variables.

By principle, MyBord-Server is set to follow
[AirBnB's Javascript Style Guide](https://github.com/airbnb/javascript) and
[TypeScript ESLint](https://github.com/typescript-eslint/typescript-eslint).

## III. Docker

We use docker for our virtualized containers.

The file, `/src/prisma/docker-compose.yml` is used by prisma to start up the configured docker
container that holds the image for our prisma instance and database.

### A. Docker Commands

* In order to create a docker image locally, make sure you have all of the necessary env vars in
the `dev.env` file and access to your own development database via heroku and then run the command
`yarn compose-docker:dev`.
* If you want to delete a local docker image & container, run the following commands:
  * List the docker containers: `docker ps`
  * Stop the relevant docker container: `docker stop <CONTAINER ID>`
  * Delete the relevant docker container: `docker rm <CONTAINER ID>`
  * List the running docker images: `docker images`
  * Delete the relevant docker image: `docker rmi <IMAGE ID>`
  
### B. References  

* [Docker CLI Reference](https://docs.docker.com/compose/reference/overview/)

## IV. Yarn Commands

The following are the yarn commands for our server application:

* **`compose-docker:dev`:**
  * This composes a local docker image / container based upon the development database instance
   from heroku.
* **`push-heroku`:**
  * This pushes our node.js application to our heroku app / instance.
* **`get-schema`:**
  * Generates graphql schema / typedefs from our prisma ORM.
* **`remove-dist`:**
  * Removes the 'dist/' folder.
* **`prisma-delete:test`:**
  * Deletes the prisma instance with the test env vars.
* **`prisma-deploy:test`:**
  * Generates / deploys the prisma instance with the test env vars.
* **`prisma-delete:dev`:**
  * Deletes the prisma instance with the dev env vars.
* **`prisma-deploy:dev`:**
  * Generates / deploys the prisma instance with the dev env vars.
* **`prisma-delete:prod`:**
  * Deletes the prisma instance with the test prod vars.
* **`prisma-deploy:prod`:**
  * Generates / deploys the prisma instance with the test env vars.
* **`webpack:dev`:**
  * Builds the server with the dev webpack configuration.
* **`webpack:prod`:**
  * Builds the server with the prod webpack configuration.
* **`build:dev`:**
  * Builds the dev server.
* **`build:prod`:**
  * Builds the prod server.
* **`run:dev`:**
  * Runs the dev server.
* **`run:prod`:**
  * Runs the prod server.
  * NOTE: this command *does not* include using the prod.env file because the production env vars
    get injected via heroku when we run `yarn start`.
* **`start`:**
  * This is the command that creates our production application; it builds our production node.js
    server / application and then runs it.
    
## V. Env Vars

The following are the env vars needed to run our server application. Note that `DOCKER_DB_HOST`,
`DOCKER_DB_NAME`, `DOCKER_DB_PASSWORD`, `DOCKER_DB_PORT`, and `DOCKER_DB_USER` are database
credentials that come from the [relevant Heroku database information](https://github.com/jimmy-e/mybord-server/blob/master/docs/deployment.md#b-instances).

* **`DOCKER_DB_HOST`**:
  * This is the host name of the relevant heroku database instance.
* **`DOCKER_DB_NAME`**:
  * This is the database name of the relevant heroku database instance.
* **`DOCKER_DB_PASSWORD`**:
  * This is the database password of the relevant heroku database instance.
* **`DOCKER_DB_PORT`**:
  * This is the database port of the relevant heroku database instance.
* **`DOCKER_DB_USER`**:
  * This is the database user id of the relevant heroku database instance.
* **`EXTERNAL_PORT`**:
  * This is the external port that our client application can connect to.
* **`GAPI_KEY`**:
  * This is the google api key that is used to access the Youtube Data API. The GAPI key can be
    found [here](https://console.developers.google.com/apis/credentials?showWizardSurvey=true&project=mybord).
* **`NODE_ENV`**:
  * Declares what environment the server application is running in; can either be 'DEV', 'PROD',
  or 'TESTING'
* **`PRISMA_ENDPOINT`**:
  * The endpoint that our prisma instance should run on.
  * NOTE: for the prod.env file, you can find the necessary http endpoint in our prisma cloud app
   at https://app.prisma.io (the http endpoint is everything before the `?`).
* **`PRISMA_SECRET`**:
  * The secret that authenticates our prisma instance.
* **`SERVER_PORT`**:
  * The exposed port that the server will run on.
* **`SESSION_SECRET`**:
  * Signs our express session cookie.
  
## VI. Running Locally

Before running the server locally, you must do the following:

1. Make sure you have created a development instance on Heroku with a postgres addon and named it
appropriately (e.g. `mybord-server-dev-jimmy`).
2. Create a `dev.env` file at the root of the directory with the required env vars outlined above.
3. Download docker community edition.
4. Build the docker container by running the command `yarn compose-docker:dev`.
5. If there were any previous prisma instances that ran, run `yarn prisma-delete:dev`.

Once you are ready to run the server locally, you must do the following steps:

1. Run `yarn prisma-deploy:dev`.
2. Run `yarn build:dev`.
3. In a second terminal window, run `yarn run:dev`.
