<img align="right" width="280" height="230" src="https://github.com/jimmy-e/mybord-server/blob/master/etc/assets/build.jpg">

# Build

This summarizes the build process for the MyBord codebase as well as any other config files.

## Table of Contents:

* [I. Heroku](#i-heroku)
* [II. Prisma Cloud](#ii-prisma-cloud)
* [III. Babel](#iii-babel)
* [IV. ESLint](#iv-eslint)
* [V. Yarn Commands](#v-yarn-commands)
* [VI. Env Vars](#vi-env-vars)
* [VII. Running Locally](#vii-running-locally)

## I. Heroku

Heroku is used to:

* Host our database
* Host our docker container
* Host our node js application

### A. Database

We use the 'Heroku Postgres' addon for our database.

## II. Prisma Cloud

Prisma Cloud is the service we use to manage our heroku prisma instance.

## III. Babel

Babel is a javascript compiler. Its configs can be found at
[.babelrc](https://github.com/jimmy-e/mybord/blob/master/.babelrc).

* [Documentation](https://babeljs.io/docs/en/)
* [Source Code](https://github.com/babel/babel)

## IV. Eslint

Eslint is used to lint our javascript and TypeScript code. It's config file in the root 
directory, [`.eslintrc.js`](https://github.com/jimmy-e/mybord/blob/master/.eslintrc.js),
sets up our syntax rules, importing rules, and use of global variables.

By principle, MyBord-Server is set to follow
[AirBnB's Javascript Style Guide](https://github.com/airbnb/javascript) and
[TypeScript ESLint](https://github.com/typescript-eslint/typescript-eslint).

## V. Yarn Commands

The following are the yarn commands for our server application:

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
    
## VI. Env Vars

The following are the env vars needed to run our server application: 

* **`GAPI_KEY`**:
  * This is the google api key that is used to access the Youtube Data API.
* **`NODE_ENV`**:
  * Declares what environment the server application is running in; can either be 'DEV', 'PROD',
  or 'TESTING'
* **`PORT`**:
  * The exposed port that the server will run on.
* **`PRISMA_ENDPOINT`**:
  * The endpoint that our prisma instance should run on.
* **`PRISMA_SECRET`**:
  * The secret that authenticates our prisma instance.
* **`SESSION_SECRET`**:
  * Signs our express session cookie.
  
## VII. Running Locally

In order to run the server locally, you must do the following steps:

1. Create a `dev.env` file at the root of the directory with the required env vars outlined above.
2. If there were any previous prisma instances that ran, run `yarn prisma-delete:dev`.
2. Run `yarn prisma-deploy:dev`.
3. Run `yarn build:dev`.
4. In a second terminal window, run `yarn run:dev`.
