import cors from 'cors';
import express from 'express';
import http from 'http';
import passport from 'passport';
import session from 'express-session';
import uuid from 'uuid/v4';
import { ApolloServer } from 'apollo-server-express';
import { GraphQLLocalStrategy, buildContext } from 'graphql-passport';
import { PubSub } from 'graphql-subscriptions';
import buildPassportContext from 'middleware/passport/buildPassportContext';
// import resolvers from 'schema/resolvers/resolvers';
// import typeDefs from 'schema/typeDefs/typeDefs';
import LocalStrategy from 'middleware/passport/strategies/localStrategy/localStrategy';
import localStrategyAuthentication from 'middleware/passport/strategies/localStrategy/localStrategyAuthentication';
import initializePrisma from './prisma/initializePrisma';
import users from './users';
import typeDefs from './typeDefs';
import resolvers from './resolvers';

// ----- PORTS ----- //

const APP_PORT = 8080;
const PORT = 4000;

// ----- SETTING UP PRISMA ----- //

const prisma = initializePrisma();

// ----- SETTING UP PASSPORT ----- //

passport.use(
  new GraphQLLocalStrategy((email, password, done) => {
    const matchingUser = users.find((user) => email === user.email && password === user.password);
    const error = matchingUser ? null : new Error('no matching user');
    done(error, matchingUser);
  }),
);

// @ts-ignore
passport.serializeUser((user, done) => done(null, user.id));

passport.deserializeUser((id, done) => {
  const matchingUser = users.find((user) => user.id === id);
  done(null, matchingUser);
});

// ----- SETTING UP EXPRESS MIDDLEWARE ----- //

const expressMiddleware = express();
const expressSessionMiddleware = session({
  // cookie: { secure: true }, // cookie must be sent via https
  genid: (request) => uuid(), // generates a session ID
  resave: false,
  saveUninitialized: false,
  secret: 'MYSECRET', // secret that is needed to sign the cookie
});
const passportMiddleware = passport.initialize();
const passportSessionMiddleware = passport.session();

expressMiddleware.use(cors({
  credentials: true,
  origin: `http://localhost:${APP_PORT}`,
}));
expressMiddleware.use(expressSessionMiddleware);
expressMiddleware.use(passportMiddleware);
expressMiddleware.use(passportSessionMiddleware);

// ----- SETTING UP SERVER ----- //

const pubsub = new PubSub();
const server = new ApolloServer({
  context: (request) => ({
    passport: buildContext({ req: request.req, res: request.res }),
    prisma,
    pubsub,
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

server.applyMiddleware({
  app: expressMiddleware,
  cors: false,
  path: '/graphql',
});

const httpServer = http.createServer(expressMiddleware);
server.installSubscriptionHandlers(httpServer);

httpServer.listen(PORT, () => {
  console.log(`Server ready at http://localhost:${PORT}${server.graphqlPath}`);
  console.log(`Subscriptions ready at ws://localhost:${PORT}${server.subscriptionsPath}`);
});

if (process.env.NODE_ENV !== 'PROD' && module.hot) {
  module.hot.accept();
  module.hot.dispose(() => server.stop());
}
