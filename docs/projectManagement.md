<img align="right" width="306" height="282" src="https://github.com/jimmy-e/mybord-server/blob/master/etc/assets/projectManagement.jpg">

# Project Management

This document is used to outline current project management priorities.

## Table of Contents

* [I. Priority Levels](#i-priority-levels)   
* [II. Long Term](#ii-long-term)   

## I. Priority Levels

### A. Highest

https://developers.google.com/youtube/v3/quickstart/nodejs
https://console.developers.google.com/apis/credentials?showWizardSurvey=true&project=mybord
https://github.com/googleapis/google-api-nodejs-client#getting-started
https://github.com/googleapis/google-api-nodejs-client/tree/master/samples/youtube
document gapi key env var
https://github.com/googleapis/google-api-nodejs-client#getting-started
* make third party documentation / folder
* document gapi key
* delete old api key
https://console.developers.google.com/apis/credentials?showWizardSurvey=true&project=mybord
https://developers.google.com/youtube/v3/quickstart/nodejs
* make ports be env vars

### B. High

* trying to login a user who does not exist returns an unhandled promise
* fix currenet user mutation - and restrict data
* add pictures to docs
* remove 'request' from context in `initialzeServer`
* remove the jwt_secret env var and all uses and all outdated auth

### C. Medium

* restrict gapi key to certain ip addresses
* create new db for docker
* add env vars in docker file
* hide db secrets in docker file
* change secrets
* make sure to lock down individual queries and subscriptions, mutations for prod app
* add password validation
* detail heroku build process, with prisma.io, and add to root readme.md as well
* outline / document where domains are kept, how they are handled, etc. -- add to root readme?
* get the `yarn run:dev` command to open up the window

### D. Low

## II. Long Term  

* add lazy loading and code splitting
