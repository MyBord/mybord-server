import bcrypt from 'bcryptjs';
import passport from 'passport';
import { GraphQLLocalStrategy } from 'graphql-passport';
import { Prisma } from 'prisma-binding';

const initializePassport = (prisma: Prisma): void => {
  // This allows us to access passport functionality from the GraphQL context and provides us
  // with a passport strategy to use with user credentials and our prisma database / orm.
  passport.use(
    new GraphQLLocalStrategy(async (email, password, done) => {
      const user = await prisma.query.user({
        where: { email },
      });

      let doesPasswordMatch;
      if (user) {
        doesPasswordMatch = await bcrypt.compare(password, user.password);
      }

      const error = (!user || !doesPasswordMatch) ? 'Unable to login' : null;

      done(error, user);
    }),
  );

  // We tell passport to save the user id's to the session
  passport.serializeUser((user: any, done) => {
    done(null, user.id);
  });

  // We get back the matching user data from the session
  passport.deserializeUser(async (id, done) => {
    const user = await prisma.query.user({ where: { id } });
    done(null, user);
  });
};

export default initializePassport;
