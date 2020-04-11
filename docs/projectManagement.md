# Project Management

This document is used to outline current project management priorities.

## Table of Contents

* [I. Priority Levels](#i-priority-levels)   
* [II. Long Term](#ii-long-term)   

## I. Priority Levels

### A. Highest

### B. High

* get license
* use custom passport scripting from other branch
* convert schema files (mutations, queries, subscriptions) to TS
* make ports be env vars
* remove 'request' from context in `initialzeServer`
* remove the jwt_secret env var and all uses and all outdated auth

### C. Medium

* create new db for docker
* add env vars in docker file
* hide db secrets in docker file
* change secrets
* make sure to lock down individual queries and subscriptions, mutations for prod app
* add password validation
* detail heroku build process, with prisma.io, and add to root readme.md as well

### D. Low

## II. Long Term  

* add lazy loading and code splitting
