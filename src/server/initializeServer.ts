import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { Prisma } from 'prisma-binding';
import { PubSub } from 'graphql-subscriptions';
import buildPassportContext from 'middleware/passport/buildPassportContext';
import resolvers from 'schema/rootResolvers/rootResolvers';
import typeDefs from 'schema/typeDefs/typeDefs';
import serverPlaygroundSettings from './serverPlaygroundSettings';

// creates new apollo server
const initializeServer = (
  expressSessionMiddleware: express.RequestHandler,
  passportMiddleware: express.Handler,
  passportSessionMiddleware: express.RequestHandler,
  prisma: Prisma,
): ApolloServer => {
  const pubsub = new PubSub();
  return new ApolloServer({
    context: (request) => ({
      passport: buildPassportContext({ request: request.req, response: request.res }),
      prisma,
      pubsub,
    }),
    playground: serverPlaygroundSettings,
    resolvers,
    typeDefs,
  });
};

export default initializeServer;
