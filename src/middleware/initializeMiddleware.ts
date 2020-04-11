import cors from 'cors';
import express, { Express } from 'express';
import passport from 'passport';
import session from 'express-session';
import { Prisma } from 'prisma-binding';
import corsOptions from './corsOptions';
import expressSessionOptions from './expressSessionOptions';
import initializePassport from './passport/initializePassport';

interface Middleware {
  expressMiddleware: Express;
  expressSessionMiddleware: express.RequestHandler;
  passportMiddleware: express.Handler;
  passportSessionMiddleware: express.RequestHandler;
}

const initializeMiddleware = (prisma: Prisma): Middleware => {
  // initializes passport
  initializePassport(prisma);

  // initializes our middleware
  const expressMiddleware = express();
  const expressSessionMiddleware = session(expressSessionOptions);
  const passportMiddleware = passport.initialize();
  const passportSessionMiddleware = passport.session();

  // implements our middleware into express
  expressMiddleware.use(cors(corsOptions));
  expressMiddleware.use(expressSessionMiddleware);
  expressMiddleware.use(passportMiddleware);
  expressMiddleware.use(passportSessionMiddleware);

  // returns our middleware
  return {
    expressMiddleware,
    expressSessionMiddleware,
    passportMiddleware,
    passportSessionMiddleware,
  };
};

export default initializeMiddleware;
