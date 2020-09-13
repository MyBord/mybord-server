import ServerError from 'server/serverError';
import { hashPassword, restrictUserData } from '../../userUtils/userUtils';

export default async (parent, args, { passport, prisma }, info) => {
  try {
    console.log('*****************');
    console.log('*****************');
    const password = await hashPassword(args.data.password);
    const finalArgs = {
      ...args,
      data: {
        ...args.data,
        password,
      },
    };

    console.log('1');
    const user = await prisma.mutation.createUser(finalArgs, info);

    console.log('2');
    passport.login({ authenticateOptions: args.data, user });

    console.log('3');
    return restrictUserData(user);
  } catch (error) {
    if (error.message.includes('unique constraint')) {
      throw new ServerError({ message: 'duplicate user', status: 400 });
    }
    if (error.message === 'password is weak') {
      throw new ServerError({ message: error.message, status: 400 });
    }
    throw new Error(error);
  }
};
