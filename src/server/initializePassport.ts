import passport from 'passport';
import { GraphQLLocalStrategy } from 'graphql-passport';
import db from '../db';

const initializePassport = (): void => {
  // This allows us to access passport functionality from the GraphQL context and provides us
  // with a strategy to use user credentials and a local database
  passport.use(
    new GraphQLLocalStrategy((email, password, done) => {
      const users = db.getUsers();
      const matchingUser = users.find((user) => email === user.email && password === user.password);
      const error = matchingUser ? null : new Error('no matching user');
      done(error, matchingUser);
    }),
  );

  // We tell passport to save the user id's to the session
  passport.serializeUser((user: any, done) => {
    done(null, user.id);
  });

  // We get back the matching user data from the session
  passport.deserializeUser((id, done) => {
    const users = db.getUsers();
    const matchingUser = users.find((user) => user.id === id);
    done(null, matchingUser);
  });
};

export default initializePassport;
