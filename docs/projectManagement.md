<img align="right" width="306" height="282" src="https://github.com/jimmy-e/mybord-server/blob/master/etc/assets/projectManagement.jpg">

# Project Management

This document is used to outline current project management priorities.

## Table of Contents

* [I. Priority Levels](#i-priority-levels)   
* [II. Long Term](#ii-long-term)   

## I. Priority Levels

### A. Highest - MVP

### B. High - MVP

* why is logging in taking so long
* login with email or username
* internal server error for new user trying to login but doesn't exist?
  - unhandled promise rejection when ltrying to login for user that does not exist
* have session be remembered by user

Production Deployment:

* change secrets
* Get production db running with backup
* figure out migrations
* document heroku server instance sizes and memory management
  * https://devcenter.heroku.com/articles/node-memory-use

### C. Medium

* add build version to index page  
  *  https://devcenter.heroku.com/changelog-items/630 
* add `build-public:prod` command to yarn start
* hide webpack build for prod applicaiton
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
* add styling to index.html landing page
* add a heroku-postbuild command?
* we should cache the card data for the two requests - initiateYoutubeCard and createYoutubeCard

### D. Low

## II. Long Term  

* add lazy loading and code splitting
