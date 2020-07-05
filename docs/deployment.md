<img align="right" width="460" height="294" src="https://github.com/jimmy-e/mybord-server/blob/master/etc/assets/rocket.png">

# Deployment

This summarizes the process for deploying the MyBord codebase to our production application. For
other related build matters, please see the [build doc](https://github.com/jimmy-e/mybord-server/blob/master/docs/build.md).

## Table of Contents:

* [I. Heroku](#i-heroku)
* [II. Prisma Cloud](#ii-prisma-cloud)

## I. Heroku

Heroku is used to:

* Host our database
* Host our docker container
* Host our node js application

### A. Deploying to Heroku

In order to deploy our node.js application to Heroku, make sure you do the following:

1. [Deploy to Prisma](#a-deploying-to-prisma)
2. If you haven't already:
  * run the command `heroku login` to authenticate your credentials with heroku.
  * create the heroku app by running the command `heroku create` and then rename that app to the
    name `mybord-server` by running the command
   `heroku apps:rename mybord-server --app <old-app-name>`.
  * Make sure that under the 'settings' tab, our heroku app has all the same config / env vars as
    our prod.env file.
3. Run the yarn command `yarn push-heroku`.

## II. Prisma Cloud

Prisma Cloud is the service we use to manage our heroku prisma instance. We can find this service
at https://app.prisma.io/

Prisma Cloud is also where we go to create our server that gets linked to heroku as well as our
database that gets linked to heroku.

### A. Deploying to Prisma

In order to deploy to Prisma, you must do the following:

1. If you haven't done so already, run the command `prisma login` to authenticate your
credentials with the prisma cloud service.
2. Run the command `yarn prisma-deploy:prod`.
  *  If you haven't set up the service before, make sure you do the following:
      * You shouldn't have the `PRISMA_ENDPOINT` env var in your prod.env file
      * Select the `mybord` server to deploy to
      * Create the name for the service; you should call it `mybord-server-prisma-service`
      * Choose the name for your the stage; you should choose `prod`
      * Copy the endpoint added to the prisma.yml file and add it to the prod.env file under the
       env var `PRISMA_ENDPOINT`
