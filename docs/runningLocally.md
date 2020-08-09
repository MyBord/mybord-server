<img align="right" width="256" height="256" src="https://github.com/jimmy-e/mybord-server/blob/master/etc/assets/terminal.png">

# Running Locally

Most of our databases and servers are hosted and run via prisma and heroku (see the 
[deployment doc](https://github.com/jimmy-e/mybord-server/blob/master/docs/deployment.md)). This
outlines what is need to instead run a server and database on your local machine.

## Table of Contents:

* [I. Creating a local instance](#i-creating-a-local-instance)
* [II. Running the local instance](#ii-running-the-local-instance)

## I. Creating a local instance

In order to run a local back end instance, you must do the following:

1. Make sure you have created a development DB instance on Heroku via Prisma by following
[these instructions](https://github.com/jimmy-e/mybord-server/blob/master/docs/deployment.md#iii-prisma-cloud).
2. Create a local.env file at the root of the folder. See more information [here](https://github.com/jimmy-e/mybord-server/blob/master/docs/build.md#vi-env-vars).
  * This file should contain the DB credentials for the running development DB instance on Heroku
   you want to connect to.
3. Download Docker Community Edition.
4. Build the docker container by running the command `yarn compose-docker:dev`.
5. If there were any previous prisma instances that were running on the docker container, run
`yarn prisma-delete:dev`.
6. Deploy the prisma instance to your local docker container by running `yarn prisma-deploy:dev`.

  
## II. Running the local instance

Once you are ready to run the server locally, you must do the following:

1. Run `yarn build:local-server`.
2. In a second terminal window, run `yarn run:local-server`.
