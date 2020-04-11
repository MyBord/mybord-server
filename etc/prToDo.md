DOCS
 * root readme
 * architecture
 * build
   - running locally: docker, dev, prod, test env
   - list env vars
 * project management  
 * prisma file
 * make sure docs look good
 * outline what the .graphqlconfig is
 * get license
 * outline our server - index.ts
 * create a new folder called 'typedefs' and move the generated schema and the schema.graphql
  folder to there and then create a final typedefs file to replace in line 34 of initializeServer


* make ports be env vars

* convert schema files (mutations, queries, subscriptions) to TS

create new db for docker
hide db secrets in docker file
change secrets
add env vars in docker file
add comments to index.ts
move datamodel.prisma to schema folder, have it import schemas per schema type
add secrets back into prisma.yml and prisma.js
add passport
when throwing errors, add status codes
make sure to lock down individual queries and subscriptions, mutations for prod app
make resolvers TS
add password validation



