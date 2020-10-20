import bcrypt from 'bcryptjs';
import { Done } from 'types/passportTypes';
import { Prisma } from 'prisma-binding';

export default async (
  emailOrUsername: string,
  password: string,
  done: Done,
  prisma: Prisma,
) => {
  try {
    const users = await prisma.query.users({
      where: {
        OR: [
          { email: emailOrUsername },
          { username: emailOrUsername },
        ],
      },
    });

    if (users.length !== 1) {
      throw new Error('Unable to retrieve user account');
    }

    let doesPasswordMatch;
    const user = users[0];

    if (user) {
      doesPasswordMatch = await bcrypt.compare(password, user.password);
    }

    const error = (!user || !doesPasswordMatch) ? new Error('Unable to login') : null;

    done(error, user);
  } catch (error) {
    throw new Error(error);
  }
};
