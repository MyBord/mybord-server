import http from 'http';
import initializeMiddleware from 'middleware/initializeMiddleware';
import initializeServer from 'server/initializeServer';
import initializePassport from 'middleware/passport/initializePassport';
import express from 'express';
import session from 'express-session';
import expressSessionOptions from 'middleware/expressSessionOptions';
import passport from 'passport';
import cors from 'cors';
import corsOptions from 'middleware/corsOptions';
import initializePrisma from './prisma/initializePrisma';

// ----- PORTS ----- //

const PORT = 4000;

// ----- SETTING UP PRISMA ----- //

const prisma = initializePrisma();

// ----- SETTING UP PASSPORT ----- //

initializePassport(prisma);

// ----- SETTING UP EXPRESS MIDDLEWARE ----- //

const expressMiddleware = express();
const expressSessionMiddleware = session(expressSessionOptions);
const passportMiddleware = passport.initialize();
const passportSessionMiddleware = passport.session();

// implements our middleware into express
expressMiddleware.use(cors(corsOptions));
expressMiddleware.use(expressSessionMiddleware);
expressMiddleware.use(passportMiddleware);
expressMiddleware.use(passportSessionMiddleware);

// ----- SETTING UP SERVER ----- //

// We initialize our Apollo Server
const server = initializeServer(
  expressSessionMiddleware,
  passportMiddleware,
  passportSessionMiddleware,
  prisma,
);

// We apply the express middleware to our server
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
