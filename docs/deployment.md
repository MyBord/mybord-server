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

### A. Database

We use the 'Heroku Postgres' addon for our database.

## II. Prisma Cloud

Prisma Cloud is the service we use to manage our heroku prisma instance.

### A. Deploying to Prisma

In order to deploy to Prisma, you must do the following:

1. If you haven't done so already, run the command `prisma login` to authenticate your
credentials with the prisma cloud service.
