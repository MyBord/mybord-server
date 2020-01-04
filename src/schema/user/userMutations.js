import hashPassword from 'utils/hashPassword';
import verifyUserAccess from 'utils/verifyUserAccess';

export default {
  createUser: async (parent, args, { passport, prisma }, info) => {
    const password = await hashPassword(args.data.password);
    const finalArgs = {
      ...args,
      data: {
        ...args.data,
        password,
      },
    };

    const user = await prisma.mutation.createUser(finalArgs, info);

    passport.login(user);

    return user;
  },
  deleteUser: async (parent, args, { prisma, request }, info) => {
    verifyUserAccess({ request, userId: args.where.id });
    return prisma.mutation.deleteUser(args, info);
  },
  loginUser: async (parent, args, { passport }, info) => {
    const { user } = await passport.authenticate(
      'graphql-local',
      args.data,
    );

    passport.login(user);

    return user;
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
