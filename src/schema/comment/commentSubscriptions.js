export default {
  comment: {
    subscribe(parent, args, { prisma }, info) {
      return prisma.subscription.comment(args, info);
    },
  },
};
