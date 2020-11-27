import ServerError from 'server/serverError';
import { hashPassword, restrictUserData } from '../../userUtils/userUtils';

export default async (parent, args, { prisma }, info) => {
  try {
    const hashedPassword = await hashPassword(args.data.password);
    const finalArgs = {
      ...args,
      data: {
        ...args.data,
        password: hashedPassword,
      },
    };

    const user = await prisma.mutation.createUser(finalArgs, info);

    return restrictUserData(user);
  } catch (error) {
    throw new ServerError(error);
  }
};
