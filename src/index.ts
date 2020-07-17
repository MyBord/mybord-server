import cors from 'cors';
import express from 'express';
import http from 'http';
import passport from 'passport';
import session from 'express-session';
import uuid from 'uuid/v4';
import { ApolloServer } from 'apollo-server-express';
import { Prisma } from 'prisma-binding';
import { PubSub } from 'graphql-subscriptions';
import initializePassport from 'middleware/passport/initializePassport';
import buildPassportContext from './middleware/passport/buildPassportContext';
import resolvers from './schema/resolvers/resolvers';
import typeDefs from './schema/typeDefs/typeDefs';

// ----- INITIALIZE PRISMA ----- //

const prisma = new Prisma({
  endpoint: 'http://localhost:4466',
  secret: 'sample_prisma_secret',
  typeDefs: 'src/schema/typeDefs/prismaSchema.graphql',
});

// ----- INITIALIZE PASSPORT ----- //

initializePassport(prisma);
const passportMiddleware = passport.initialize();
const passportSessionMiddleware = passport.session();

// ----- INITIALIZE EXPRESS ----- //

const expressMiddleware = express();
const expressSessionMiddleware = session({
  genid: (request) => uuid(),
  resave: false,
  saveUninitialized: false,
  secret: 'sample_session_secret',
});

expressMiddleware.use(cors({
  credentials: true,
  origin: 'http://localhost:8080',
}));

expressMiddleware.use(expressSessionMiddleware);
expressMiddleware.use(passportMiddleware);
expressMiddleware.use(passportSessionMiddleware);

// ----- ADD AN INDEX PAGE ----- //

expressMiddleware.get('/', (req, res) => {
  res.sendFile('src/index.html', { root: '.' });
});

// ----- INITIALIZE OUR SERVER ----- //

const pubsub = new PubSub();

const server = new ApolloServer({
  context: (request) => ({
    passport: buildPassportContext({ request: request.req, response: request.res }),
    prisma,
    pubsub,
  }),
  playground: {
    settings: {
      'request.credentials': 'same-origin',
    },
  },
  resolvers,
  typeDefs,
});

server.applyMiddleware({
  app: expressMiddleware,
  cors: false,
  path: '/graphql',
});

// We create an http server and then add subscriptions
// https://www.apollographql.com/docs/apollo-server/data/subscriptions/#subscriptions-with-additional-middleware
const httpServer = http.createServer(expressMiddleware);
server.installSubscriptionHandlers(httpServer);

// We run our http server.
httpServer.listen(process.env.PORT, () => {
  console.log(`Server ready at http://localhost:${process.env.PORT}${server.graphqlPath}`);
  console.log(`Subscriptions ready at ws://localhost:${process.env.PORT}${server.subscriptionsPath}`);
});

// Using webpack's hot module replacement, if needed.
if (process.env.NODE_ENV !== 'PROD' && module.hot) {
  module.hot.accept();
  module.hot.dispose(() => server.stop());
}
