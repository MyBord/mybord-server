<img align="right" width="295" height="180.5" src="https://github.com/jimmy-e/mybord-server/blob/master/etc/assets/nodeLogo.svg">

# Application Summary

This summarizes some important implementation details about our node.js application, how it is
built, and how it runs.

## Table of Contents:

* [I. User Sessions & Cookies](#i-user-sessions--cookies)
* [II. CORS Configuration](#ii-cors-configuration)

## I. User Sessions & Cookies

### A. Summary

We use `express-session` to manage our user sessions. We make this session persistent throughout
recurring requests by saving a user identifier inside a cookie.

We set up this session by doing the following:

```js
import session from 'express-session';
import uuid from 'uuid/v4';

const SESSION_SECRECT = 'bad secret';
const app = express();

const sessionOptions = {
  genid: (request) => uuid(), // generates a session ID
  resave: false,
  saveUninitialized: false,
  secret: SESSION_SECRECT, // secret that is needed to sign the cookie
};

// cookie must be sent via https
if (process.env.MODE === 'PROD') {
  sessionOptions.cookie = {
    sameSite: 'none',
    secure: true,
  };
}

app.use(session(sessionOptions));

app.listen( ... );
```

Here we use `uuid` to generate a session id and use a secret to sign the cookie.

Things to note:

* We are currently using the default in-memory store to save our session data. This means that
all sessions will be deleted when we restart the server. We can save session data to storage
with ready-made stores by using different libraries such as [connect-redis](https://github.com/tj/connect-redis).
* When our server is in production, we set the cookie to secure mode so that it can only be
sent via https and set the sameSite attribute to 'none'.

### B. Resources

* https://jkettmann.com/authentication-and-authorization-with-graphql-and-passport/

## II. CORS Configuration

Our CORS are configured per the following:

```js
const corsOptions = {
  credentials: true,
};

if (process.env.MODE === 'DEV') {
  corsOptions.origin = `http://localhost:${process.env.EXTERNAL_PORT}`;
}

export default corsOptions;
```

* **`credentials: true`:**
  * Configures the Access-Control-Allow-Credentials CORS header; is set to true to pass the header.
* **origin:**  
  * Declares where requests are allowed from.
  * If the server is in 'DEV' mode, then we allow it to be accessed via a localhost / local
   running front end.
