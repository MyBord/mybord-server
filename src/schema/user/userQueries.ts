import restrictUserData from 'utils/restrictUserData';

export default {
  isAuthenticated: async (parent, args, { passport }, info) => (
    passport.isAuthenticated()
  ),
  logoutUser: async (parent, args, { passport }, info) => passport.logout(),
  users: async (parent, args, { prisma }, info) => {
    const finalArgs = {
      ...args,
      where: {
        ...args.where,
      },
    };
    if (args && args.where && args.where.email) {
      delete finalArgs.where.email;
    }

    const users = await prisma.query.users(finalArgs, info);

    return users.map(async (user) => restrictUserData(user));
  },
};
