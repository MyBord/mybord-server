import cors from 'cors';
import express, { Express } from 'express';
import passport from 'passport';
import session from 'express-session';
import { Prisma } from 'prisma-binding';
import uuid from 'uuid/v4';
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

  // returns our middleware
  return {
    expressMiddleware,
    expressSessionMiddleware,
    passportMiddleware,
    passportSessionMiddleware,
    prisma,
  };
};
