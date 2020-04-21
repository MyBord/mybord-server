<img align="right" width="294" height="257" src="https://github.com/jimmy-e/mybord-server/blob/master/etc/assets/architecture.png">

# Architecture Guide

This summarizes the general architecture behind the MyBord back-end codebase.

## Table of Contents

* [I. Summary](#i-summary)   
* [II. Architecture](#ii-architecture)   
  * [A. Root folder](#a-root)
  * [B. src folder](#b-src-folder)
  * [C. middleware folder](#c-middleware-folder)
  * [D. passport folder](#d-passport-folder)
  * [E. prisma folder](#e-prisma-folder)
  * [F. schema folder](#f-schema-folder)
  * [G. server folder](#g-server-folder)

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
    |- assets/ 
    |- prToDo.md
  node_modules/
  src/
  .babelrc
  .eslintrc.js
  .gitignore
  dev.env
  LICENSE.md
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
* **etc/assets:**
  * folder containing images used in our docs.
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
* **`LICENSE.md`:**
  * Contains the software license / copyright.
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
  |- middleware/
  |- prisma/ 
  |- schema/ 
  |- server/ 
  |- serverError/ 
     |- serverError.ts
  |- thirdParty/ 
  |- types/ 
  |- utils/ 
  |- .graphqlconfig 
  |- index.ts
```

* **middleware/:**
  * Contains configurations and files that create and initialize our middleware. For further
   information, see the [middleware folder outline](#c-middleware-folder)
* **prisma/:**
  * Contains the code used to configure and initialize our prisma orm instance. Fur further
   information, see the [prisma folder outline](#e-prisma-folder).
* **schema/:**
  * Contains our database schema. For more information, see the
  [schema folder outline](#f-schema-folder).
* **server/:**
  * Contains files that configure and initialize our server. For more information, see the
  [server folder outline](#g-server-folder).
* **`serverError/serverError.ts`:**
  * Custom error object that gets thrown to the front end to communicate server errors.
* **thirdParty:**
  * Code used to interact with third party tooling and apis.
* **types/:**
  * Folder containing types and interfaces used across the server codebase.
* **utils/:**
  * Folder containing utility functions used across the server codebase.
* **`.graphqlconfig`:**
  * Determines where the generated prisma graphql schema should be saved.
* **`index.ts`:**
  * The script that runs our server. It does the following:
    * Initializes prisma.
    * Initializes our middleware.
    * Initializes our apollo server.
    * Applies the middleware to our server.
    * Creates an http server.
    * Open up our http server on a certain port.
    * Uses hot module replacement if not in PROD mode.
    
### C. middleware folder

Our server folder contains various configuration files and scripts that allows us to initialize
our server. Most importantly, it is in this folder where we initialize our middleware, our prisma
instance, and our server itself. It is outlined as follows:

```
server/
  |- passport/
  |- corsOptions.ts
  |- expressSessionOptions.ts
  |- initializeMiddleware.ts
```

* **passport/:**
  * Contains code for our passport authentication middleware. For more information, see our
   [passport folder outline](#d-passport-folder)
* **`corsOptions.ts`:**
  * Configures our cors options.
* **`expressSessionOptions.ts`:**
  * Configures our express session.
* **`initializeMiddleware.ts`:**
  * Initializes our middleware. Included in this file we do the following:
    * Initialize passport
    * Initialize express
    * Initialize the express session
    * Configure our cors options
    * Configure our express session options

### D. passport folder

The passport folder contains code that is used to create our passport authentication middleware.

For context, as documented [here](http://www.passportjs.org/docs/):

> Passport recognizes that each application has unique authentication requirements. Authentication
> mechanisms, known as strategies, are packaged as individual modules. Applications can choose
> which strategies to employ, without creating unnecessary dependencies. 

Our passport folder is organized as follows:

```
passport/
  |- strategies/
     |- localStrategy/
        |- localStrategy.ts
        |- localStrategyAuthentication.ts
  |- buildPassportContext.ts
  |- initializePassport.ts
```

* **strategies:**
  * Folder that contains the different strategies for a user to authenticate from.
* **strategies/localStrategy/:**
  * Folder that contains code that allows users to authenticate via their creds from the mybord
   server / db.
* **`strategies/localStrategy/localStrategy.ts`:**
  * The class object used to authenticate a user to the mybord server.
* **`strategies/localStrategy/localStrategyAuthentication.ts`:**
  * The function that actually authenticates the user with the mybord server.
* **`buildPassportContext.ts`:**
  * Creates an object that can be attached to the Apollo Server context object.
* **`initializePassport.ts`:**
  * Initializes the passport authentication instance and strategies.

### E. prisma folder

The prisma folder contains the code used to configure and initialize our prisma orm instance. It is
organized in the following manner:

```
prisma/
  |- docker-compose.yml
  |- initializePrisma.ts
  |- prisma.yml
```

* **`docker-compose.yml`:**
  * Configures a docker image for our prisma instace / db. [See here](https://v1.prisma.io/docs/1.1/reference/clusters/docker-aira9zama5/).
* **`initializePrisma.ts`:**
  * Initializes our prisma orm. This function sets our prisma endpoint, secret, and points to the
   generated prisma typeDefs that should get used.
* **`prisma.yml`:**
  * Configures our prisma service.
  
### F. schema folder

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

* **`userPrismaSchema.graphql`:**
  * Outlines the relational model for each individual schema for our prisma ORM.
* **`userMutations.ts`:**
  * Contains non prisma ORM mutations for our individual schema.
* **`userQueries.ts`:**
  * Contains non prisma ORM queries for our individual schema.
* **`userSchema.ts`:**
  * Contains non prisma ORM type definitions for our individual schema.
* **`userSubscriptions.ts`:**
  * Contains non prisma ORM subscriptions for our individual schema.

#### ii. Resolvers

Our resolvers folder contains all of the non prisma resolvers (mutations, queries, and
subscriptions), to be used by our server.

```
schema/
  |- comment/ 
  |- post/ 
  |- user/ 
  |- resolvers/ 
     |- mutations.ts
     |- queries.ts
     |- resolvers.ts
     |- subscriptions.ts
```

* **`mutations.ts`:**
  * Contains all non prisma ORM mutations.
* **`queries.ts`:**
  * Contains all non prisma ORM queries.
* **`resolvers.ts`:**
  * Contains all non prisma ORM resolvers (mutations, queries, and subscriptions) and is the
   final file that gets used to generate the resolvers when we initialize our server.
* **`subscriptions.ts`:**
  * Contains all non prisma ORM subscriptions.
  
#### iii. TypeDefs

Our typeDefs folder contains all of the graphql typeDefs that gets used by our server.

```
schema/
  |- comment/ 
  |- post/ 
  |- user/ 
  |- resolvers/ 
  |- typeDefs/ 
     |- prismaSchema.graphql
     |- schema.graphql
     |- typeDefs.ts
```

* **`prismaSchema.graphql`:**
  * Contains the generated prisma graphql schema, queries, mutations, and subscriptions.
* **`schema.graphql`:**
  * Contains the non prisma type definitions / schema.
* **`typeDefs.ts`:**
  * The final file that gets used to generate the typeDefs when we initialize our server;
  contains both our prisma schema and our non prisma schema.

### G. server folder

Our server folder contains the script that intializes our apollo server.

```
server/
  |- initializeServer.ts
```

* **`initializeServer.ts`:**
  * Initializes our server by creating a new Apollo Server. It does the following:
    * Adds prisma and passport to our context.
    * Configures our playground settings.
    * Configures our resolvers and typeDefs and resolvers from our '/schema' folder.
