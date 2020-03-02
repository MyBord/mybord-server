import bcrypt from 'bcryptjs';
import passport from 'passport';
import { Prisma } from 'prisma-binding';
import * as passportLocal from 'passport-local';

const initializePassport = (prisma: Prisma): void => {
  passport.use(new passportLocal.Strategy(
    { username: 'email' },
    (async (email, password, done) => {
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
  ));

  // We tell passport to save the user id's to the session
  passport.serializeUser((user: any, done) => {
    console.log('serialize user fn; user object:');
    console.log(user);
    done(null, user.id);
  });

  // We get back the matching user data from the session
  passport.deserializeUser(async (id, done) => {
    const user = await prisma.query.user({ where: { id } });
    done(null, user);
  });
};

export default initializePassport;
