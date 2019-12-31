import verifyUserAccess from 'utils/verifyUserAccess';

export default {
  myPosts: async (parent, args, { prisma, request }, info) => {
    verifyUserAccess({ request, userId: args.where.author.id });
    return prisma.query.posts(args, info);
  },
  posts: async (parent, args, { prisma, request }, info) => {
    verifyUserAccess({ request, requireAuthentication: false });
    const finalArgs = {
      ...args,
      where: {
        ...args.where,
        published: true,
      },
    };
    return prisma.query.posts(finalArgs, info);
  },
};
