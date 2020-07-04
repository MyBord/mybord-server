<img align="right" width="306" height="282" src="https://github.com/jimmy-e/mybord-server/blob/master/etc/assets/projectManagement.jpg">

# Project Management

This document is used to outline current project management priorities.

## Table of Contents

* [I. Priority Levels](#i-priority-levels)   
* [II. Long Term](#ii-long-term)   

## I. Priority Levels

### A. Highest - MVP

### B. High - MVP

* internal server error for new user trying to login but doesn't exist?
* add env vars in docker file
* hide db secrets in docker file
* have session be remembered by user
* change secrets
* Google API
  * rest gapi key?
  * restrict gapi key to certain ip addresses?

BUILD / Production Deploy:

* Get domain running on mybord.io
* Get production db running with backup
* Make sure it is always spinning on heroku
* detail heroku build process, with prisma.io, and add to root readme.md as well

### C. Medium

* prevent duplicate cards
* when adding youtube video card, check for duplicates
* create new db for docker
* make sure to lock down individual queries and subscriptions, mutations for prod app
* outline / document where domains are kept, how they are handled, etc. -- add to root readme?
* get the `yarn run:dev` command to open up the window

### D. Low

## II. Long Term  

* add lazy loading and code splitting
