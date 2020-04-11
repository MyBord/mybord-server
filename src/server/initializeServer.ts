import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { Prisma } from 'prisma-binding';
import resolvers from 'schema/resolvers/resolvers';
import typeDefs from 'schema/typeDefs/typeDefs';
import buildPassportContext from './passport/buildPassportContext';

// creates new apollo server
const initializeServer = (
  expressSessionMiddleware: express.RequestHandler,
  passportMiddleware: express.Handler,
  passportSessionMiddleware: express.RequestHandler,
  prisma: Prisma,
): ApolloServer => new ApolloServer({
  context: (request) => ({
    passport: buildPassportContext({ request: request.req, response: request.res }),
    prisma,
    request,
  }),
  playground: {
    settings: {
      'request.credentials': 'same-origin',
    },
  },
  resolvers,
  typeDefs,
});

export default initializeServer;
