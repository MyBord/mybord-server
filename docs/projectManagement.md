<img align="right" width="306" height="282" src="https://github.com/jimmy-e/mybord-server/blob/master/etc/assets/projectManagement.jpg">

# Project Management

This document is used to outline current project management priorities.

## Table of Contents

* [I. Priority Levels](#i-priority-levels)   
* [II. Long Term](#ii-long-term)   

## I. Priority Levels

### A. Highest - MVP

* make ports be env vars

### B. High - MVP

* fix user gating for user cards query
* delete old gapi key
* remove 'request' from context in `initialzeServer`
* remove the jwt_secret env var and all uses and all outdated auth
* add env vars in docker file
* hide db secrets in docker file
* change secrets

BUILD / Production Deploy:

* Get domain running on mybord.io
* Get production db running with backup
* Make sure it is always spinning on heroku
* detail heroku build process, with prisma.io, and add to root readme.md as well

### C. Medium

* when adding youtube video card, check for duplicates
* restrict gapi key to certain ip addresses
* create new db for docker
* make sure to lock down individual queries and subscriptions, mutations for prod app
* outline / document where domains are kept, how they are handled, etc. -- add to root readme?
* get the `yarn run:dev` command to open up the window

### D. Low

## II. Long Term  

* add lazy loading and code splitting
