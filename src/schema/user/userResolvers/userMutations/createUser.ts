import ServerError from 'server/serverError';
import { hashPassword, restrictUserData, validateUsername } from '../../userUtils/userUtils';

export default async (parent, args, { passport, prisma }, info) => {
  try {
    validateUsername(args.data.username);
    const password = await hashPassword(args.data.password);
    const finalArgs = {
      ...args,
      data: {
        ...args.data,
        password,
      },
    };

    const user = await prisma.mutation.createUser(finalArgs, info);

    passport.login({ authenticateOptions: args.data, user });

    return restrictUserData(user);
  } catch (error) {
    if (error.message === 'invalid username') {
      throw new ServerError({ message: 'invalid username', status: 400 });
    }
    if (error.message.includes('unique constraint')) {
      throw new ServerError({ message: 'duplicate user', status: 400 });
    }
    if (error.message === 'weak password') {
      throw new ServerError({ message: error.message, status: 400 });
    }
    throw new ServerError(error);
  }
};
