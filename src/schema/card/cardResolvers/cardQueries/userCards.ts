export default async (parent, args, { passport, prisma }, info) => {
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
};
