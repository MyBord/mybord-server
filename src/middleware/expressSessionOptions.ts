import uuid from 'uuid/v4';
import { SessionOptions } from 'express-session';

const sessionOptions: SessionOptions = {
  genid: (request) => uuid(), // generates a session ID
  resave: false,
  saveUninitialized: false,
  secret: process.env.SESSION_SECRET, // secret that is needed to sign the cookie
};

// cookie must be sent via https
if (process.env.NODE_ENV === 'PROD') {
  sessionOptions.cookie = {
    sameSite: 'none',
    secure: true,
  };
}

export default sessionOptions;
