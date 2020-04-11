# Architecture Guide

This summarizes the general architecture behind the MyBord back-end codebase.

## Table of Contents

* [I. Summary](#i-summary)   
* [II. Architecture](#ii-architecture)   
  * [A. Root Folder](#a-root)
  * [B. src Folder](#b-src-folder)
  * [C. schema Folder](#c-schema-folder)
  * [D. server Folder](#d-server-folder)

## I. Summary

Architecture throughout the codebase, and the documentation behind them, should accomplish the
following:

* **Scalability:**
    * To support the application's continuous growth both in terms of volume and complexity.
* **Team growth:**
    * If and when a development team grows, to enable multiple developers with various expertise
    levels to collaborate and develop on the application simultaneously. This should allow
    development to occur in the following ways:
        * Allows developers to easily work independently on the application without having to worry
        about other developers interfering with their code. Allows developers to not have to worry
        about learning or worrying about other areas of the application in which they do not own
        (multiple developers simultaneously building different components without having to worry
        about how other teammates are building those components and how said components work).
        * Enable teammates to collaborate easily and understand each other's work quickly given a
        development structure / architecture.
* **DRY-ability:**
    * Reduce redundancies in the codebase as well as make it easy to reduce future redundancies.
* **Learn-ability:**
    * Structure the application in such a way that it is easily understandable and easy for new
    developers to join and quickly begin developing. This will reduce the team's bus factor,
    making sure that one of our high points of failure is not having to lose a developer with highly
    developed domain knowledge.

## II. Architecture

The following outlines how the MyBord front-end codebase is architected.

### A. Root

The following architecture details are concerned with what should be contained in the root of the
application folder.

```
  dist/
  docs/
  etc/
    |- prToDo.md
  node_modules/
  src/
  .babelrc
  .eslintrc.js
  .gitignore
  dev.env
  package.json
  prod.env
  README.md
  test.env
  tsconfig.json
  typings.d.ts
  webpack.common.js
  webpack.dev.js
  webpack.prod.js
  yarn.lock
```

* **dist/:**
  * folder that contains the server build.
* **docs/:**
  * folder that contains the server documentation.
* **`etc/prToDo.md`:**
  * a space to put notes regarding a current branch / pr.
* **`node_modules`:**
  * folder that holds all npm packages. should be git ignored.
* **src/:**
  * folder that contains the server source code.
* **`.babelrc`:**
  * babel configs.
* **`.eslintrc.js`:**
  * eslint configs.
* **`.gitignore`:**
  * configuration list of git ignores.
* **`dev.env`:**
  * a file containing node environment variables for your local instance when running
   the server in 'dev' mode.
* **`package.json`:**
  * the package manager and metadata.
* **`prod.env`:**
  * a file containing node environment variables for your local instance when running
   the server in 'prod' mode.
* **`README.md`:**
  * the root readme document.
* **`tsconfig.json`:**
  * Specifies how TypeScript should be compiled.
* **`typings.d.ts`:**
  * Allows us to add global custom typings.
* **`webpack.common.js`:**
  * universal webpack configs.
* **`webpack.dev.js`:**
  * webpack configs exclusive for dev builds.
* **`webpack.prod.js`:**
  * webpack configs exclusive for prod builds.
* **`yarn.lock`:**
  * yarn's package lock file.

### B. src folder

The src folder contains the source code for our server and is organized in the following
manner:

```
src/
  |- prisma/ 
  |- schema/ 
  |- server/ 
  |- serverError/ 
     |- serverError.ts
  |- types/ 
  |- utils/ 
  |- .graphqlconfig 
  |- index.ts
```

* **`prisma/docker-compose.yml`:**
  * This file contains the configuration for our docker container from which our database will
   prisma database will run on.
* **`prisma/prisma.yml`:**
  * Configures our prisma service.
* **schema/:**
  * Contains our database schema. For more information, see the
  [schema folder outline](#c-schema-folder).
* **server/:**
  * Contains files that configure and initialize our server. For more information, see the
  [server folder outline](#d-server-folder).
* **`serverError/serverError.ts`:**
  * Custom error object that gets thrown to the front end to communicate server errors.
* **types/:**
  * Folder containing types and interfaces used across the server codebase.
* **utils/:**
  * Folder containing utility functions used across the server codebase.
* **`.graphqlconfig`:**
  * Configures the graphql endpoint.
* **`index.ts`:**
  * The script that runs our server.
  
### C. schema folder

The `schema/` folder contains the schema that structures our database and server orm. It is
structured in the following way:

```
schema/
  |- individualSchemaOne/ 
  |- individualSchemaTwo/ 
  |- individualSchemaThree/ 
  |- resolvers/ 
  |- typeDefs/ 
```

#### i. Individual Schemas 

Each individual schema (e.g. 'user') needs to have the following files:

```
schema/
  |- comment/ 
  |- post/ 
  |- user/ 
     |- userPrismaSchema.graphql
     |- userMutations.ts
     |- userQueries.ts
     |- userSchema.graqphql
     |- userSubscriptions.ts
```

* **`userModel.graphql`:**
  * Outlines the relational model for our prisma ORM.
* **`userMutations.ts`:**
  * Contains custom mutations for our user schema not generated by our prisma ORM.
* **`userQueries.ts`:**
  * Contains custom queries for our user schema not generated by our prisma ORM.
* **`userSubscriptions.ts`:**
  * Contains custom subscriptions for our user schema not generated by our prisma ORM.

#### i. Final Resolvers


### D. server folder
