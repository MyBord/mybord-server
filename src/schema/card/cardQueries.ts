export default {
  userCards: async (parent, args, { passport, prisma }, info) => {
    try {
      console.log('---------------');
      console.log('---------------');
      console.log(passport.getUser());
      console.log('---------------');
      console.log('---------------');
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
