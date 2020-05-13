import passport from 'passport';
import { Prisma } from 'prisma-binding';
import { GraphQLLocalStrategy, buildContext } from 'graphql-passport';
import users from './users';

const initializePassport = (prisma: Prisma): void => {
  passport.use(
    new GraphQLLocalStrategy((email, password, done) => {
      const matchingUser = users.find((user) => email === user.email && password === user.password);
      const error = matchingUser ? null : new Error('no matching user');
      done(error, matchingUser);
    }),
  );

  // @ts-ignore
  passport.serializeUser((user, done) => done(null, user.id));

  passport.deserializeUser((id, done) => {
    const matchingUser = users.find((user) => user.id === id);
    done(null, matchingUser);
  });
};

export default initializePassport;
