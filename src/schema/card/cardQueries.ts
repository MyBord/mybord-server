export default {
  userCards: async (parent, args, { passport, prisma }, info) => {
    try {
      const userId = passport.getUserId();

      const finalArgs = {
        ...args,
        where: {
          user: {
            id: userId,
          },
        },
      };

      return prisma.query.cards(finalArgs, info);
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  },
};
