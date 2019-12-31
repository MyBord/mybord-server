import verifyUserAccess from 'utils/verifyUserAccess';

export default {
  createPost: async (parent, args, { prisma, request }, info) => {
    verifyUserAccess({ request, userId: args.data.author.connect.id });
    return prisma.mutation.createPost(args, info);
  },
  deletePost: async (parent, args, { prisma, request }, info) => {
    const post = await prisma.query.posts(args, '{ author { id } }');
    verifyUserAccess({ request, userId: post[0].author.id });
    return prisma.mutation.deletePost(args, info);
  },
  updatePost: async (parent, args, { prisma, request }, info) => {
    const post = await prisma.query.posts(args, '{ author { id } }');
    verifyUserAccess({ request, userId: post[0].author.id });
    return prisma.mutation.updatePost(args, info);
  },
};
