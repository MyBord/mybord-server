import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { buildContext } from 'graphql-passport';
import resolvers from '../resolvers';
import typeDefs from '../typeDefs';

const initializeServer = (
  expressSessionMiddleware: express.RequestHandler,
  passportMiddleware: express.Handler,
  passportSessionMiddleware: express.RequestHandler,
): ApolloServer => new ApolloServer({
  context: (request) => ({
    passport: buildContext({ req: request.req, res: request.res }),
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
