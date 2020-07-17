import cors from 'cors';
import express from 'express';
import http from 'http';
import passport from 'passport';
import session from 'express-session';
import uuid from 'uuid/v4';
import { ApolloServer } from 'apollo-server-express';
import { Prisma } from 'prisma-binding';
import { PubSub } from 'graphql-subscriptions';
import LocalStrategy
  from './middleware/passport/strategies/localStrategy/localStrategy';
import buildPassportContext from './middleware/passport/buildPassportContext';
import localStrategyAuthentication
  from './middleware/passport/strategies/localStrategy/localStrategyAuthentication';
import resolvers from './resolvers';
import typeDefs from './typeDefs';

// ----- INITIALIZE PRISMA ----- //

const prisma = new Prisma({
  endpoint: 'http://localhost:4466',
  secret: 'sample_prisma_secret',
  typeDefs: 'src/schema/typeDefs/prismaSchema.graphql',
});

// ----- INITIALIZE PASSPORT ----- //

passport.use(
  new LocalStrategy((email, password, done) => (
    localStrategyAuthentication(email, password, done, prisma)
  )),
);

passport.serializeUser((user: any, done) => done(null, user.id));

passport.deserializeUser(async (id, done) => {
  const user = await prisma.query.user({ where: { id } });
  done(null, user);
});

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

// ----- RUNNING THE SERVER ----- //

const httpServer = http.createServer(expressMiddleware);
server.installSubscriptionHandlers(httpServer);

const PORT = 4000;

httpServer.listen(PORT, () => {
  console.log(`Server ready at http://localhost:${PORT}${server.graphqlPath}`);
  console.log(`Subscriptions ready at ws://localhost:${PORT}${server.subscriptionsPath}`);
});

if (process.env.NODE_ENV !== 'PROD' && module.hot) {
  module.hot.accept();
  module.hot.dispose(() => server.stop());
}
