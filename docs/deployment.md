<img align="right" width="460" height="294" src="https://github.com/jimmy-e/mybord-server/blob/master/etc/assets/rocket.png">

# Deployment

This summarizes the process for deploying the MyBord codebase to our production application. For
other related build matters, please see the [build doc](https://github.com/jimmy-e/mybord-server/blob/master/docs/build.md).

## Table of Contents:

* [I. Summary](#i-summary)
* [II. Heroku](#ii-heroku)
* [III. Prisma Cloud](#iii-prisma-cloud)

## I. Summary

We use two services for deployment:
  * Heroku:
    * Hosts our production database
    * Hosts our Prisma docker container
    * Hosts our Node.js application
  * Prisma Cloud:
    * Makes it easy to manage those Heroku prisma instances
    
In order to deploy our back end production application, we need to do the following:    
1. [Create a prisma service](#a-creating-prisma-services)

## II. Heroku

Heroku is used to:

* Host our database
* Host our docker container
* Host our node js application

### A. Deploying to Heroku

In order to deploy our node.js application to Heroku, make sure you do the following:

1. [Deploy to Prisma](#b-deploying-to-prisma)
2. If you haven't already:
  * run the command `heroku login` to authenticate your credentials with heroku.
  * create the heroku app by running the command `heroku create` and then rename that app to the
    name `mybord-server` by running the command
   `heroku apps:rename mybord-server --app <old-app-name>`.
  * Make sure that under the 'settings' tab, our heroku app has all the same config / env vars as
    our prod.env file.
3. Run the yarn command `yarn push-heroku`.

### B. Instances

In addition to hosting our production instance, heroku also hosts our development and testing
instances.

Each instance is created by creating a new app in heroku. We have the following instances:

* `mybord-server-testing`: Our testing instance
* `mybord-server-dev-<developer_first_name>`: The testing instance for each developer (e.g.
`mybord-server-dev-jimmy`, or if multiple are needed per developer, `mybord-server-dev-jimmy-1`,
`mybord-server-dev-jimmy-2`, etc).

Each instance will need the Heroku Postgres addon. Once you create this addon, you can then go to
the instance's datastore dashboard, go to the 'settings' tab and click on 'view credentials',
and there you can see the database credentials needed to populate the dev.env and test.env files.

## III. Prisma Cloud

Prisma Cloud is the service we use to manage our heroku prisma instances. We can find this service
at `https://app.prisma.io/`. Prisma Cloud is also where we go to create our server and database
that gets linked to heroku.

### A. Creating Prisma Services

In order to create our necessary prisma services, we need to:
1. Create a prisma account
2. Create a new prisma server. The server name should be `mybord-prisma`.
3. Set up a database that is connected to Heroku and connect it to your existing Heroku account.
4. Set up a PostgreSQL database.
5. Set up a server connected to Heroku.
6. Once the server is set up and running, view the server details and click on the database and
the button 'view on heroku'. From there, you can get the database credentials from heroku for
our production prisma service.

### B. Deploying to Prisma

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
