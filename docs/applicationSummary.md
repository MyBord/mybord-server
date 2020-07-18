<img align="right" width="295" height="180.5" src="https://github.com/jimmy-e/mybord-server/blob/master/etc/assets/nodeLogo.svg">

# Application Summary

This summarizes some important implementation details about our node.js application, how it is
built, and how it runs.

## Table of Contents:

* [I. User Sessions & Cookies](#i-user-sessions--cookies)

## I. User Sessions & Cookies

### A. Summary

We use `express-session` to manage our user sessions. We make this session persistent throughout
recurring requests by saving an identifier inside a cookie.

We set up this session by doing the following:

```js
import session from 'express-session';
import uuid from 'uuid/v4';

const SESSION_SECRECT = 'bad secret';
const app = express();

app.use(session({
  genid: (req) => uuid(),
  secret: SESSION_SECRECT,
  resave: false,
  saveUninitialized: false,
}));

app.listen( ... );
```

Here we use `uuid` to generate a session id and use a secret to sign the cookie.

Note:
  * We are currently using the default in-memory store to save our session data. This means that
   all sessions will be deleted when we restart the server. We can save session data to storage
   with ready-made stores by using different libraries such as [connect-redis](https://github.com/tj/connect-redis).
  * We will also want to set the cookie to secure mode so that it is only sent via https. This
   can be done by using the `cookie` option: `cookie: { secure: true }`

### B. Resources

* https://jkettmann.com/authentication-and-authorization-with-graphql-and-passport/

