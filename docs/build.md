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
* [VI. Important Branches](#vi-important-branches)

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
* **`push-heroku:dev`:**
  * This pushes our node.js application to our development heroku app (e.g.
  `mybord-server-dev-jimmy`). See [deploying our node.js application to Heroku](https://github.com/jimmy-e/mybord-server/blob/master/docs/deployment.md#a-deploying-our-nodejs-application-to-heroku)
  for more information.
* **`push-heroku:prod`:**
  * This pushes our node.js application to our production heroku app (e.g.
  `mybord-server-prod`). See [deploying our node.js application to Heroku](https://github.com/jimmy-e/mybord-server/blob/master/docs/deployment.md#a-deploying-our-nodejs-application-to-heroku)
  for more information.
* **`get-schema`:**
  * Generates graphql schema / typedefs from our prisma ORM.
* **`remove-dist`:**
  * Removes the 'dist/' folder.
* **`prisma-delete:dev`:**
  * Deletes the prisma instance hosted on the dev instance.
* **`prisma-deploy:dev`:**
  * Generates / deploys the prisma instance to the dev instance.
* **`prisma-delete:local`:**
  * Deletes the prisma instance hosted that is hosted locally.
* **`prisma-deploy:local`:**
  * Generates / deploys the prisma instance to a local instance.
* **`prisma-delete:prod`:**
  * Deletes the prisma instance hosted on the prod instance.
* **`prisma-deploy:prod`:**
  * Generates / deploys the prisma instance to the prod instance.
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
* **`run:local`:**
  * Runs a local server.
* **`run:prod`:**
  * Runs the prod server.
  * NOTE: this command *does not* include using the prod.env file because the production env vars
    get injected via heroku when we run `yarn start`.
* **`start`:**
  * This is the command that creates our production application; it builds our production node.js
    server / application and then runs it. We use the `start` command because when we deploy our
    node.js application to heroku, it looks at our `package.json` file and runs the `start` command.
    
## V. Env Vars

### A. Env Var Files

When running locally, at the root of folder, you will need to create three separate env var files:

* **`local.env`:**
  * a file containing node environment variables for your local instance when running
   the server in 'LOCAL' mode.
* **`dev.env`:**
  * a file containing node environment variables for your deployed development instance when running
   the server in 'DEV' mode.
* **`prod.env`:**
  * a file containing node environment variables for your deployed production instance when running
   the server in 'PROD' mode.
   
### B. List of Env Vars   

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
  * Declares what environment the server application is running in; can either be 'DEV', 'LOCAL',
  or 'PROD'.
* **`PORT`**:
  * The exposed port that the server will run on.
  * NOTE: This env var **must** be named `PORT` because Heroku uses this env var to declare what
   port the node.js application must run on when the application is deployed to Heroku. Because
   of this, *all .env files should not declare this env var*.
* **`PRISMA_ENDPOINT`**:
  * The endpoint that our prisma instance should run on.
  * NOTE: except for the local.env file, you can find the necessary http endpoint in our prisma
   cloud app at https://app.prisma.io (the http endpoint is everything before the `?`).
  * NOTE: the `PRISMA_ENDPOINT` for local.env should be `http://localhost:4466/default/default`
* **`PRISMA_SECRET`**:
  * The secret that authenticates our prisma instance.
* **`SESSION_SECRET`**:
  * Signs our express session cookie.
  
### C. Env Var File Examples  
  
**`dev.env`:**
```
DOCKER_DB_HOST=ec2-1234.compute-1.amazonaws.com
DOCKER_DB_NAME=db1234
DOCKER_DB_PASSWORD=abcd1234
DOCKER_DB_PORT=9876
DOCKER_DB_USER=jklmno
EXTERNAL_PORT=8080
GAPI_KEY=defgh34567
NODE_ENV=DEV
PRISMA_ENDPOINT=https://sample-app.herokuapp.com/sample-app-prisma-service/dev
PRISMA_SECRET=thisIsAPrismaSecret
SESSION_SECRET=thisisASessionSecret
```

**`local.env`:**
```
DOCKER_DB_HOST=ec2-1234.compute-1.amazonaws.com
DOCKER_DB_NAME=db1234
DOCKER_DB_PASSWORD=abcd1234
DOCKER_DB_PORT=9876
DOCKER_DB_USER=jklmno
EXTERNAL_PORT=8080
GAPI_KEY=defgh34567
NODE_ENV=LOCAL
PRISMA_ENDPOINT=http://localhost:4466/default/default
PRISMA_SECRET=thisIsAPrismaSecret
SESSION_SECRET=thisisASessionSecret
```

**`prod.env`:**
```
DOCKER_DB_HOST=ec2-1234.compute-1.amazonaws.com
DOCKER_DB_NAME=db1234
DOCKER_DB_PASSWORD=abcd1234
DOCKER_DB_PORT=9876
DOCKER_DB_USER=jklmno
EXTERNAL_PORT=8080
GAPI_KEY=defgh34567
NODE_ENV=PROD
PRISMA_ENDPOINT=https://sample-app.herokuapp.com/sample-app-prisma-service/prod
PRISMA_SECRET=thisIsAPrismaSecret
SESSION_SECRET=thisisASessionSecret
```

## VI. Important Branches

The following are important branches in regards to the `mybord-server` repo:

* **`master:`**:
  * This is the branch where our production code lives.
* **`mini_server:`**:
  * This branch contains a very simplified build of our node.js application and is used for
   debugging.
