import bcrypt from 'bcryptjs';
import generateToken from 'utils/generateToken';
import hashPassword from 'utils/hashPassword';
import verifyUserAccess from 'utils/verifyUserAccess';

export default {
  createUser: async (parent, args, { prisma }, info) => {
    const password = await hashPassword(args.data.password);
    const finalArgs = {
      ...args,
      data: {
        ...args.data,
        password,
      },
    };

    const user = await prisma.mutation.createUser(finalArgs, info);

    return {
      ...user,
      token: generateToken(user.id),
    };
  },
  deleteUser: async (parent, args, { prisma, request }, info) => {
    verifyUserAccess({ request, userId: args.where.id });
    return prisma.mutation.deleteUser(args, info);
  },
  loginUser: async (parent, args, { prisma }, info) => {
    const user = await prisma.query.user({
      where: {
        email: args.data.email,
      },
    });

    if (!user) {
      throw new Error('Unable to login.');
    }

    const doesPasswordMatch = await bcrypt.compare(args.data.password, user.password);

    if (!doesPasswordMatch) {
      throw new Error('Unable to login.');
    }

    return {
      ...user,
      token: generateToken(user.id),
    };
  },
  updateUser: async (parent, args, { prisma, request }, info) => {
    verifyUserAccess({ request, userId: args.where.id });
    const password = await hashPassword(args.data.password);
    const finalArgs = {
      ...args,
      data: {
        ...args.data,
        password,
      },
    };
    return prisma.mutation.updateUser(finalArgs, info);
  },
};
