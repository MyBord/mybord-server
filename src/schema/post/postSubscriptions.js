import getUserId from 'utils/getUserId';

export default {
  myPost: {
    subscribe(parent, args, { prisma, request }, info) {
      const userId = getUserId(request);
      const whereArgs = args.where && args.where;
      const nodeArgs = args.where && args.where.node && args.where.node;
      const finalArgs = {
        ...args,
        where: {
          ...whereArgs,
          node: {
            ...nodeArgs,
            author: {
              id: userId,
            },
          },
        },
      };
      return prisma.subscription.post(finalArgs, info);
    },
  },
  post: {
    subscribe(parent, args, { prisma }, info) {
      const whereArgs = args.where && args.where;
      const nodeArgs = args.where && args.where.node && args.where.node;
      const finalArgs = {
        ...args,
        where: {
          ...whereArgs,
          node: {
            ...nodeArgs,
            published: true,
          },
        },
      };
      return prisma.subscription.post(finalArgs, info);
    },
  },
};
