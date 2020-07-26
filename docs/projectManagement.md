<img align="right" width="306" height="282" src="https://github.com/jimmy-e/mybord-server/blob/master/etc/assets/projectManagement.jpg">

# Project Management

This document is used to outline current project management priorities.

## Table of Contents

* [I. Priority Levels](#i-priority-levels)   
* [II. Long Term](#ii-long-term)   

## I. Priority Levels

### A. Highest - MVP

### B. High - MVP

* change node env flag to something else to not interfere with webpack
* fix cors options
* hot module should run only when node env === LOCAL
* add build version to index page  
  *  https://devcenter.heroku.com/changelog-items/630 
* add a heroku-postbuild command?
* internal server error for new user trying to login but doesn't exist?
* have session be remembered by user
* change secrets
* Google API
  * reset gapi key?
  * restrict gapi key to certain ip addresses?
* lock down playground from heroku url  

Production Deployment:

* prevent url from heroku from modifying DB
* Get domain running on mybord.io ?
* Get production db running with backup
* Make sure it is always spinning on heroku

* make backups of github repos

### C. Medium

* gitignore dist folder
* upgrade to prisma 2
  * https://www.prisma.io/docs/guides/upgrade-guides/upgrade-from-prisma-1
* prevent duplicate cards
* when adding youtube video card, check for duplicates
* create new db for docker
* make sure to lock down individual queries and subscriptions, mutations for prod app
* outline / document where domains are kept, how they are handled, etc. -- add to root readme?
* get the `yarn run:dev` command to open up the window
* dev dependencies do not get pruned when pushed to heroku because flag is not 'produciton'

### D. Low

## II. Long Term  

* add lazy loading and code splitting
