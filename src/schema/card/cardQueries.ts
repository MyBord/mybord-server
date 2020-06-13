export default {
  userCards: async (parent, args, { passport, prisma }, info) => {
    console.log(' -- is authenticated: -- ');
    console.log(passport.isAuthenticated());
    console.log(' -- is authenticated: -- ');
    const userId = passport.getUserId();
    console.log(userId);

    const finalArgs = {
      ...args,
      where: {
        user: {
          id: userId,
        },
      },
    };

    return prisma.query.cards(finalArgs, info);
  },
};
