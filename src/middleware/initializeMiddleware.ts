import cors from 'cors';
import enforce from 'express-sslify';
import express, { Express } from 'express';
import passport from 'passport';
import session from 'express-session';
import { Prisma } from 'prisma-binding';
import corsOptions from './corsOptions';
import expressSessionOptions from './expressSessionOptions';
import initializePassport from './passport/initializePassport';
import initializePrisma from '../prisma/initializePrisma';

interface Middleware {
  expressMiddleware: Express;
  expressSessionMiddleware: express.RequestHandler;
  passportMiddleware: express.Handler;
  passportSessionMiddleware: express.RequestHandler;
  prisma: Prisma;
}

export default (): Middleware => {
  // We initialize our Prisma db instance
  const prisma = initializePrisma();

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

  // enforces HTTPS for our production server
  // https://help.heroku.com/J2R1S4T8/can-heroku-force-an-application-to-use-ssl-tls
  if (process.env.MODE === 'PROD') {
    expressMiddleware.use(enforce.HTTPS({ trustProtoHeader: true }));
  }

  // We serve our public client application
  expressMiddleware.use(express.static('public'));
  expressMiddleware.get('*', (request, response) => {
    response.sendFile('public/index.html', { root: '.' });
  });

  // returns our middleware
  return {
    expressMiddleware,
    expressSessionMiddleware,
    passportMiddleware,
    passportSessionMiddleware,
    prisma,
  };
};
