import uuid from 'uuid/v4';
import { SessionOptions } from 'express-session';

const sessionOptions: SessionOptions = {
  cookie: { sameSite: 'strict', secure: true }, // cookie must be sent via https
  genid: (request) => uuid(), // generates a session ID
  resave: false,
  saveUninitialized: false,
  secret: process.env.SESSION_SECRET, // secret that is needed to sign the cookie
};

export default sessionOptions;
