import express, { Express } from 'express';
import passport from 'passport';
import session from 'express-session';
import uuid from 'uuid/v4';
import initializePassport from './initializePassport';

const initializeExpress = (): Express => {
  // initializes passport
  initializePassport();

  // initializes our express middleware
  const app = express();

  // instantiates the express-session middleware
  app.use(session({
    // cookie: { secure: true }, // cookie must be sent via https
    genid: (request) => uuid(), // generates a session ID
    resave: false,
    saveUninitialized: false,
    secret: process.env.SESSION_SECRET, // secret that is needed to sign the cookie
  }));

  // we initialize passport for express
  app.use(passport.initialize());

  // we connect passport and express-session
  app.use(passport.session());

  return app;
};

export default initializeExpress;
