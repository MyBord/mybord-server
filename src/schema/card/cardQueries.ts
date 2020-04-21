export default {
  // ToDo: restrict cards query
  cards: async (parent, args, { prisma }, info) => prisma.query.cards(args.data, info),
};
