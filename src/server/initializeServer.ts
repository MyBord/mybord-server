import { ApolloServer } from 'apollo-server-express';
import { Prisma } from 'prisma-binding';
import { buildContext } from 'graphql-passport';
import resolvers from 'schema/resolvers';
import generatedSchema from 'generated/prisma.graphql';
import schema from 'schema/schema.graphql';

// creates new apollo server
const initializeServer = (prisma: Prisma): ApolloServer => new ApolloServer({
  context: (request) => ({
    passport: buildContext({ req: request.req, res: request.res }),
    prisma,
    request,
  }),
  resolvers,
  typeDefs: [generatedSchema, schema],
});

export default initializeServer;
