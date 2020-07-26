<img align="right" width="460" height="294" src="https://github.com/jimmy-e/mybord-server/blob/master/etc/assets/rocket.png">

# Deployment

This summarizes the process for deploying the MyBord server application to various
running databases and servers. For other related build matters, please see the
[build doc](https://github.com/jimmy-e/mybord-server/blob/master/docs/build.md).

## Table of Contents:

* [I. Summary](#i-summary)
* [II. Managing Our Instances](#ii-managing-our-instances)
* [III. Prisma Cloud](#iii-prisma-cloud)
* [IV. Heroku](#iv-heroku)

## I. Summary

We use two services for deployment:

* Heroku:
  * Hosts our production database
  * Hosts our Prisma docker container
  * Hosts our Node.js application
* Prisma Cloud:
  * Makes it easy to manage those Heroku prisma instances
    
In order to deploy our back end production application, we need to do the following:    

1. [Create a Prisma database](#a-creating-a-prisma-database)
2. [Deploy a Prisma instance to a Prisma service](#b-deploying-a-prisma-instance-to-a-prisma-service)
3. [Create a node.js server](#a-creating-nodejs-server-in-heroku)
4. [Deploy our node.js application to heroku](#b-deploying-a-nodejs-application-to-heroku)

## II. Managing Our Instances

Before we create our servers, databases, and running applications, we first need to list what
instances we need and need to manage. We have instances that are managed on both Prisma and
 Heroku. This is how they are named and managed:

* **prod instances:**
  * `mbp-db-prod`: This is where our production database is hosted via prisma.
  * `mbp-db-prod-service`: This is where our production prisma service is managed.
  * `mbh-server-prod`: This is where our production node.js server is hosted via heroku.
* **dev instances:**
  * `mbp-db-dev-<developer_name>`: This is where our development database is hosted via prisma.
  * `mbp-db-dev-<developer_name>-service`: This is where our development prisma service is managed.
  * `mbh-server-dev-<developer_name>`: This is where our development node.js server is hosted via
  heroku.
  * *Note*: dev instances are per developer. If multiple instances are needed, then we can add
   additional numbers, e.g. `mbp-db-dev-jimmy-1`, `mbp-db-dev-jimmy-2`.
  
*Note:* `mbp` stands for 'mybord-prisma' and `mbh` stands for 'mybord-heroku'.

## III. Prisma Cloud

Prisma Cloud is the service we use to manage our instances. We can find this service
at `https://app.prisma.io/`.

In order to use Prisma Cloud, we need to:

1. Create a Prisma database / prisma server
2. Deploy our prisma instance to a Prisma service

### A. Creating a Prisma database

In order to create the necessary prisma database / prisma server, we need to:

1. Create a prisma account.
2. Create a new prisma server. The server name should be one of the instance names listed in the
 [managing our instances](#ii-managing-our-instances) section.
3. Set up a database that is connected to Heroku and connect it to your existing Heroku account.
4. Set up a PostgreSQL database.
5. Set up a server connected to Heroku.
6. Once the server is set up and running, view the database details by clicking on the database
and the button 'view on heroku'. From there, you can get the database credentials and
use those credentials to populate the respective .env file.

### B. Deploying a Prisma instance to a Prisma service

In order to deploy to Prisma, you can run the command `yarn prisma-deploy:<prod, dev, etc>`.

If you haven't deployed to Prisma before and created the necessary service, you must do the
following:

1. Run the command `prisma login` to authenticate your credentials with the prisma cloud service.
2. Make sure you don't have the `PRISMA_ENDPOINT` env var in the respective .env file
3. Run the command `yarn prisma-deploy:<prod, dev, etc>`.
4. Select the server you want to deploy to
5. Create the name for the service; you should add `-service` to the server name, e.g.
`mbp-db-prod-service`, `mbp-db-dev-jimmy-service`.
6. Choose the respective name for your the stage.
7. Copy the endpoint added to the prisma.yml file and add it to the respective .env file under
the env var `PRISMA_ENDPOINT`.

## IV. Heroku

Heroku is used to:

* Host our database - via prisma cloud
* Host our docker container - via prisma cloud
* Host our node js application

### A. Creating node.js server in Heroku

In order to create a node.js server in Heroku, do the following:

1. If you haven't done so already, authenticate with heroku by running `heroku login`.
2. Make sure you have created the respective Prisma DB and instance and have all of the
neccessary env vars, including the DB credentials as well as the Prisma endpoint.
3. Go to the heroku dashboard and create a new app, and give it the appropriate name.	
4. Make sure under the 'settings' tab, our heroku app has all the same config / env vars that	
is needed for the respective .env file.
5. Add the env var `NODE_OPTIONS=--max_old_space_size=2560` to the list of our heroku env vars.	
This allows us to increase our javascript application memory allocation and avoiding a	
javascript heap memory error. See [here](https://stackoverflow.com/questions/59205530/heroku-server-crashes-with-javascript-heap-out-of-memory-when-deploying-react)	
and [here](https://stackoverflow.com/questions/38558989/node-js-heap-out-of-memory).	
6. In your terminal, run the command `heroku labs:enable runtime-dyno-metadata -a <app_name>`
with `app_name` being the respective name of the heroku app. Doing so will enable our node.js
application access to runtime heroku metadata. For more information, see [here](https://devcenter.heroku.com/articles/dyno-metadata).

### B. Deploying a node.js application to Heroku

In order to deploy our node.js application to Heroku, make sure you do the following:

1. Make sure all of the necessary instances listed in ['managing our instances'](#ii-managing-our-instances)
have been created.
2. Add the production heroku app as a git repository. Do this by going to the production heroku
app in the heroku dashboard, click on the settings tab, copying the 'Heroku git URL', and running
the following command: `git remote add heroku-prod <heroku_git_url>`.
3. Add the development heroku app as a git repository. Do this by going to your heroku development
app in the heroku dashboard, click on the settings tab, copying the 'Heroku git URL', and running
the following command: `git remote add heroku-dev <heroku_git_url>`.

Once these commands have been run, you can then deploy your application to Heroku by running
either `yarn push-heroku:prod` or `yarn push-heroku:dev`.

### C. Other Herku Resources & Commands

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
