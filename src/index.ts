import http from 'http';
import passport from 'passport';
import uuid from 'uuid/v4';
import LocalStrategy from 'middleware/passport/strategies/localStrategy/localStrategy';
import localStrategyAuthentication from 'middleware/passport/strategies/localStrategy/localStrategyAuthentication';
import initializeServer from 'server/initializeServer';
import express from 'express';
import session from 'express-session';
import cors from 'cors';
import initializePrisma from './prisma/initializePrisma';

// ----- PORTS ----- //

const APP_PORT = 8080;
const PORT = 4000;

// ----- SETTING UP PRISMA ----- //

const prisma = initializePrisma();

// ----- SETTING UP PASSPORT ----- //

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

const server = initializeServer(
  expressSessionMiddleware,
  passportMiddleware,
  passportSessionMiddleware,
  prisma,
);

server.applyMiddleware({
  app: expressMiddleware,
  cors: false,
  path: '/graphql',
});

const httpServer = http.createServer(expressMiddleware);
server.installSubscriptionHandlers(httpServer);

// We run our http server.
httpServer.listen(PORT, () => {
  console.log(`Server ready at http://localhost:${PORT}${server.graphqlPath}`);
  console.log(`Subscriptions ready at ws://localhost:${PORT}${server.subscriptionsPath}`);
});

// Using webpack's hot module replacement, if needed.
if (process.env.NODE_ENV !== 'PROD' && module.hot) {
  module.hot.accept();
  module.hot.dispose(() => server.stop());
}
