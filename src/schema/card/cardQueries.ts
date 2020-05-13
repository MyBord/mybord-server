export default {
  userCards: async (parent, args, { passport, prisma }, info) => {
    const userId = passport.getUser();

    const finalArgs = {
      ...args,
      where: {
        user: {
          id: userId.id,
        },
      },
    };

    return prisma.query.cards(finalArgs, info);
  },
};
