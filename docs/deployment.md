<img align="right" width="460" height="294" src="https://github.com/jimmy-e/mybord-server/blob/master/etc/assets/rocket.png">

# Deployment

This summarizes the process for deploying the MyBord codebase to our production application. For
other related build matters, please see the [build doc](https://github.com/jimmy-e/mybord-server/blob/master/docs/build.md).

## Table of Contents:

* [I. Summary](#i-summary)
* [II. Prisma Cloud](#ii-prisma-cloud)
* [III. Heroku](#iii-heroku)

## I. Summary

We use two services for deployment:

* Heroku:
  * Hosts our production database
  * Hosts our Prisma docker container
  * Hosts our Node.js application
* Prisma Cloud:
  * Makes it easy to manage those Heroku prisma instances
    
In order to deploy our back end production application, we need to do the following:    

1. [Create a Prisma Server and database](#a-creating-a-prisma-server-and-database)
2. [Deploy our application to a Prisma service](#b-deploying-our-application-to-a-prisma-service)
3. [Deploy our node.js application to heroku](#b-deploying-our-nodejs-application-to-heroku)

Furthermore, see [this section](#b-deploying-our-application-to-a-prisma-service) on how we
manage our heroku instances.

## II. Prisma Cloud

Prisma Cloud is the service we use to manage our heroku prisma instances. We can find this service
at `https://app.prisma.io/`. Prisma Cloud is also where we go to create our server and database
that gets linked to heroku.

In order to use Prisma Cloud, we need to:

1. Create a Prisma Server and database
2. Deploy our application to a Prisma service

### A. Creating a Prisma Server and database

In order to create our necessary prisma services, we need to:

1. Create a prisma account
2. Create a new prisma server. The server name should be `mybord-prisma`.
3. Set up a database that is connected to Heroku and connect it to your existing Heroku account.
4. Set up a PostgreSQL database.
5. Set up a server connected to Heroku.
6. Once the server is set up and running, view the server details and click on the database and
the button 'view on heroku'. From there, you can get the database credentials from heroku for
our production prisma service. These credentials are what are needed for our prod.env env vars.

### B. Deploying our application to a Prisma service

In order to deploy to Prisma, you must do the following:

1. If you haven't done so already, run the command `prisma login` to authenticate your
credentials with the prisma cloud service.
2. Run the command `yarn prisma-deploy:prod`.
  *  If you haven't set up the service before, make sure you do the following:
      * You shouldn't have the `PRISMA_ENDPOINT` env var in your prod.env file
      * Select the `mybord-prisma` server to deploy to
      * Create the name for the service; you should call it `mybord-server-prisma-service`
      * Choose the name for your the stage; you should choose `prod`
      * Copy the endpoint added to the prisma.yml file and add it to the prod.env file under the
       env var `PRISMA_ENDPOINT`
       
## III. Heroku

Heroku is used to:

* Host our database - via prisma cloud
* Host our docker container - via prisma cloud
* Host our node js application

### A. Managing our instances

The following instances are hosted on heroku:

* **`mybord-server-prod`:**
  * This is where our production node.js application is hosted.
* **`mybord-server-dev-<developer_first_name>`:**
  * A development server for each developer, e.g. `mybord-server-dev-jimmy`. If multiple are
  needed per developer, then we can add additional numbers, e.g. `mybord-server-dev-jimmy-1`,
  `mybord-server-dev-jimmy-2`.

To create an instance:

1. Go to the heroku dashboard and create a new app, and give it a proper name.
2. Make sure that under the 'settings' tab, our heroku app has all the same config / env vars that
our prod.env file should have.
3. Add the env var `NODE_OPTIONS=--max_old_space_size=2560` to the list of our heroku env vars.
This allows us to increase our javascript application memory allocation and avoiding a
javascript heap memory error. See [here](https://stackoverflow.com/questions/59205530/heroku-server-crashes-with-javascript-heap-out-of-memory-when-deploying-react)
and [here](https://stackoverflow.com/questions/38558989/node-js-heap-out-of-memory).
4. Each instance will need the Heroku Postgres addon. Once you create this addon, you can then go to
the instance's datastore dashboard, go to the 'settings' tab and click on 'view credentials',
and there you can see the database credentials needed to populate the dev.env and test.env files,
if necessary.

### B. Deploying our node.js application to Heroku

In order to deploy our node.js application to Heroku, make sure you do the following:

1. Make sure all of the necessary instances listed in ['managing out instances'](#a-managing-our-instances)
have been created.
2. Add the production heroku app as a git repository. Do this by going to the production heroku
app in the heroku dashbord, click on the settings tab, copying the 'Heroku git URL', and running
the following command: `git remote add heroku-production <heroku_git_url>`.
3. Add the development heroku app as a git repository. Do this by going to your heroku development
app in the heroku dashbord, click on the settings tab, copying the 'Heroku git URL', and running
the following command: `git remote add heroku-development <heroku_git_url>`.

Once these commands have been run, you can then deploy your application to Heroku by running
either `yarn push-heroku:prod` or `yarn push-heroku:dev`.

### C. Other Resources & Commands

* **Deploying from a branch besides master:**
  * If you want to deploy code to Heroku from a non-master branch of your local repository
  (for example, `testbranch`), use the following syntax to ensure it is pushed to the remote’s master
  branch: `git push heroku testbranch:master`.
* **Adding heroku git repository:**
  * To add an existing heroku git repository, run this command: `heroku git:remote -a yourapp`.
* **Tip of current heroku branch is behind:**
  * If, when trying to push to heroku, the attempt was rejected because 'the tip of your current
   branch is behind', then you can just use the `-ff` flag to fast forward:
   `git push heroku master -ff`.
* **Redeploying to heroku:**
  * If you want to redeploy to heroku but have not made any changes to your branch, run the
   following commands:
   ```
   git commit --allow-empty -m "redeploying to heroku"
   git push heroku master
   ```
* **Listing all apps:**
  * To list all heroku apps, run the following command: `heroku list`
* **Pushing to a different heroku app:**
  * To push do a different heroku app, first go to the respective heroku app and under 'settings'
  find the heroku git url, then run the following commands:
  ```
  git remote add test-app1 <heroku_git_url>
  git push test-app1 master
  ```
* **Getting the logs of a specifc app:**
  * To get the logs of a specific app, run the following command:
  `heroku logs --app sample_app_name --tail`.
