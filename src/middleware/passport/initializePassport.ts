import passport from 'passport';
import { Prisma } from 'prisma-binding';
import LocalStrategy from './strategies/localStrategy/localStrategy';
import localStrategyAuthentication from './strategies/localStrategy/localStrategyAuthentication';

const initializePassport = (prisma: Prisma): void => {
  passport.use(
    // Adds local passport strategy so that users can authenticate with their local db
    // credentials.
    new LocalStrategy((email, password, done) => (
      localStrategyAuthentication(email, password, done, prisma)
    )),
  );

  // We tell passport to save the user id's to the session
  passport.serializeUser((user: any, done) => done(null, user.id));

  // We get back the matching user data from the session
  passport.deserializeUser(async (id, done) => {
    const user = await prisma.query.user({ where: { id } });
    done(null, user);
  });
};

export default initializePassport;
