import bcrypt from 'bcryptjs';
import { Done } from 'types/passportTypes';
import { Prisma } from 'prisma-binding';

export default async (
  email: string,
  password: string,
  done: Done,
  prisma: Prisma,
) => {
  const user = await prisma.query.user({
    where: { email },
  });

  let doesPasswordMatch;
  if (user) {
    doesPasswordMatch = await bcrypt.compare(password, user.password);
  }

  const error = (!user || !doesPasswordMatch) ? new Error('Unable to login') : null;

  done(error, user);
};
